#!/usr/bin/env python3
"""
Lettuce Print — ClickUp Task Creator
Creates tasks in Client Projects list matching the LP task format with ALL fields
needed for Printavo quote generation.

Task name format: [Company] - [Contact First Name] - [Description]
Example: Brooklyn Bloom - Sarah - T-Shirts & Tote Bags

Usage — Print job:
  python3 create_clickup_task.py --company "Brooklyn Bloom" --contact "Sarah" \
    --what "Business Cards" --type print \
    --deadline "2026-04-25" \
    --artwork "client has files" \
    --items '[{"desc":"16pt Matte Business Cards","size":"3.5x2","stock":"16pt Tango C2S Cover","finish":"Matte","qty":500,"price":"","supplier":"PBD","ship_to":"client pickup","production_notes":""}]'

Usage — Apparel job:
  python3 create_clickup_task.py --company "Clearly Faded" --contact "Steven" \
    --what "Embroidered Hats" --type apparel \
    --deadline "2026-04-30" \
    --artwork "to be provided" \
    --items '[{"deco":"Embroidery","brand":"Otto Cap","color":"Black","locations":"Front center","colors_per":"4000 stitches","qty":48,"price":"","supplier":"DAM","ship_to":"Lettuce Print - 361 Stagg St Brooklyn","production_notes":"Fold and bag"}]'

Usage — Mixed job:
  python3 create_clickup_task.py --company "High Empire" --contact "Shari" \
    --what "Shirts & Flyers" --type mixed \
    --deadline "2026-04-28" \
    --artwork "client sending files" \
    --print-items '[{"desc":"Full color flyers","size":"5.5x8.5","stock":"100lb gloss","finish":"","qty":500,"price":"","supplier":"PSI","ship_to":"","production_notes":""}]' \
    --apparel-items '[{"deco":"Screen Print","brand":"Gildan G500","color":"Black","locations":"Front chest","colors_per":"2","qty":72,"price":"","supplier":"DAM","ship_to":"","production_notes":""}]' \
    --ship-to "client pickup"
"""

import argparse
import json
import urllib.request
import urllib.error
from datetime import datetime

CLICKUP_TOKEN = "pk_87423040_0Q5FFGFP7WE4U0DQRJMK2CKNLRUC4A72"
CLIENT_PROJECTS_LIST = "212512555"
DELIVERY_DATE_FIELD = "712fcb2b-9981-4938-b524-86d6b6f9b6fb"
TEMPLATE_2026 = "t-868k5kt9z"
BASE_URL = "https://api.clickup.com/api/v2"

ASSIGNEE_JANET = 57094967
ASSIGNEE_STEVEN = 1388965


def build_print_section(items, artwork):
    lines = []
    lines.append("Print Project Details")
    lines.append(f"Printavo Customer ID: {items[0].get('printavo_id', '') if items else ''}")
    lines.append(f"Customer Artwork: {artwork}")
    lines.append("")
    for i, item in enumerate(items, 1):
        lines.append(f"Description: {item.get('desc', '')}")
        lines.append(f"Size: {item.get('size', '')}")
        lines.append(f"Stock: {item.get('stock', '')}")
        lines.append(f"Finish: {item.get('finish', '')}")
        lines.append(f"Quantity: {item.get('qty', '')}")
        lines.append(f"Single Sided: {item.get('single_sided', '')}")
        lines.append(f"Lot: {item.get('lot', '')}")
        lines.append(f"Price: {item.get('price', '')}")
        lines.append(f"Supplier: {item.get('supplier', '')}")
        if i < len(items):
            lines.append("")
    return "\n".join(lines)


def build_apparel_section(items, artwork):
    lines = []
    lines.append("Apparel Project Details")
    lines.append(f"Customer Artwork: {artwork}")
    lines.append("")

    # Group by decoration type
    screen_print = [i for i in items if i.get('deco', '').lower() in ('screen print', 'screenprint')]
    dtg_dtf = [i for i in items if i.get('deco', '').lower() in ('dtg', 'dtf')]
    embroidery = [i for i in items if i.get('deco', '').lower() == 'embroidery']

    if screen_print:
        lines.append("Screen Print")
        for item in screen_print:
            lines.append(f"Garment:")
            lines.append(f"- Style: {item.get('brand', '')}")
            lines.append(f"- Color: {item.get('color', '')}")
            lines.append(f"- Quantity: {item.get('qty', '')}")
            lines.append(f"- Size Breakdown: {item.get('size_breakdown', '')}")
            lines.append("")
            lines.append("Print Details:")
            locs = item.get('locations', '').split(',') if item.get('locations') else []
            colors = item.get('colors_per', '').split(',') if item.get('colors_per') else []
            for idx, loc in enumerate(locs, 1):
                lines.append(f"- Location {idx}: {loc.strip()}")
                if idx <= len(colors):
                    lines.append(f"  - Ink Colors: {colors[idx-1].strip()}")
                lines.append(f"  - Print Size: {item.get('print_size', '')}")
                lines.append(f"  - Placement: {item.get('placement', '')}")
            lines.append("")

    if dtg_dtf:
        lines.append("DTF/DTG")
        for item in dtg_dtf:
            lines.append(f"Garment:")
            lines.append(f"- Style: {item.get('brand', '')}")
            lines.append(f"- Color: {item.get('color', '')}")
            lines.append(f"- Quantity: {item.get('qty', '')}")
            lines.append(f"- Size Breakdown: {item.get('size_breakdown', '')}")
            lines.append("")
            lines.append("DTF Print Details:")
            locs = item.get('locations', '').split(',') if item.get('locations') else []
            for idx, loc in enumerate(locs, 1):
                lines.append(f"- Location {idx}: {loc.strip()}")
                lines.append(f"  - Print Size: {item.get('print_size', '')}")
                lines.append(f"  - Artwork Name: {item.get('artwork_name', '')}")
            lines.append("")

    if embroidery:
        lines.append("Embroidery")
        for item in embroidery:
            lines.append(f"Garment:")
            lines.append(f"- Style: {item.get('brand', '')}")
            lines.append(f"- Color: {item.get('color', '')}")
            lines.append(f"- Quantity: {item.get('qty', '')}")
            lines.append(f"- Size Breakdown: {item.get('size_breakdown', '')}")
            lines.append("")
            lines.append("Embroidery Details:")
            lines.append(f"- Location: {item.get('locations', '')}")
            lines.append(f"- Embroidery Size: {item.get('embroidery_size', '')}")
            lines.append(f"- Estimated Stitch Count: {item.get('stitch_count', item.get('colors_per', ''))}")
            lines.append(f"- Thread Colors: {item.get('thread_colors', '')}")
            lines.append("")

    return "\n".join(lines)


def build_description(job_type, artwork, print_items=None, apparel_items=None):
    sections = []
    if job_type in ("print", "mixed") and print_items:
        sections.append(build_print_section(print_items, artwork))
    if job_type in ("apparel", "mixed") and apparel_items:
        if sections:
            sections.append("")  # spacer between sections
        sections.append(build_apparel_section(apparel_items, artwork))
    return "\n".join(sections)


def create_task_from_template(task_name, template_id=TEMPLATE_2026):
    """Create a task using a ClickUp task template."""
    url = f"{BASE_URL}/list/{CLIENT_PROJECTS_LIST}/taskTemplate/{template_id}"
    payload = {"name": task_name}
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data,
        headers={"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            print(f"✅ Task created from template: {result['name']}")
            print(f"   Task ID:  {result['id']}")
            print(f"   URL:      {result['url']}")
            return result
    except urllib.error.HTTPError as e:
        print(f"❌ Template error: {e.code} — {e.read().decode()}")
        return None


def update_task(task_id, description=None, assignees=None, status=None,
                priority=None, due_date_ms=None):
    """Update an existing ClickUp task."""
    payload = {}
    if description is not None:
        payload["description"] = description
    if assignees is not None:
        payload["assignees"] = {"add": assignees}
    if status is not None:
        payload["status"] = status
    if priority is not None:
        payload["priority"] = priority
    if due_date_ms is not None:
        payload["due_date"] = due_date_ms

    if not payload:
        return None

    url = f"{BASE_URL}/task/{task_id}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data,
        headers={"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"},
        method="PUT"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"❌ Update error: {e.code} — {e.read().decode()}")
        return None


def create_task(company, contact, what, job_type, deadline, artwork,
                print_items=None, apparel_items=None, urgent=False,
                use_template=False):

    task_name = f"{company} - {contact} - {what}"
    description = build_description(job_type, artwork, print_items, apparel_items)

    # Priority
    priority = 3  # normal
    if urgent:
        priority = 1
    elif deadline:
        try:
            days = (datetime.strptime(deadline, "%Y-%m-%d") - datetime.now()).days
            if days < 3:
                priority = 1
            elif days <= 5:
                priority = 2
        except ValueError:
            pass

    # Due date in ms
    due_date_ms = None
    if deadline:
        try:
            dt = datetime.strptime(deadline, "%Y-%m-%d")
            due_date_ms = int(dt.timestamp() * 1000)
        except ValueError:
            pass

    if use_template:
        # Step 1: Create from template
        result = create_task_from_template(task_name)
        if not result:
            return None
        task_id = result["id"]
        # Step 2: Update with job details
        update_task(
            task_id,
            description=description,
            assignees=[ASSIGNEE_JANET, ASSIGNEE_STEVEN],
            status="quoting",
            priority=priority,
            due_date_ms=due_date_ms
        )
        print(f"   Status:   quoting")
        print(f"   Assigned: Janet + Steven")
        if deadline:
            print(f"   Due:      {deadline}")
        print(f"\n💬 Next: Add Printavo quote # as a comment on task {task_id}")
        return result
    else:
        # Original direct creation
        payload = {
            "name": task_name,
            "description": description,
            "assignees": [ASSIGNEE_JANET, ASSIGNEE_STEVEN],
            "status": "quoting",
            "priority": priority,
        }
        if due_date_ms:
            payload["due_date"] = due_date_ms

        url = f"{BASE_URL}/list/{CLIENT_PROJECTS_LIST}/task"
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url, data=data,
            headers={"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"},
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as resp:
                result = json.loads(resp.read())
                print(f"✅ Task created: {result['name']}")
                print(f"   Task ID:  {result['id']}")
                print(f"   URL:      {result['url']}")
                print(f"   Status:   {result['status']['status']}")
                print(f"   Assigned: Janet + Steven")
                if deadline:
                    print(f"   Due:      {deadline}")
                print(f"\n💬 Next: Add Printavo quote # as a comment on task {result['id']}")
                return result
        except urllib.error.HTTPError as e:
            print(f"❌ Error: {e.code} — {e.read().decode()}")
            return None


def add_printavo_comment(task_id, printavo_visual_id):
    """Add Printavo quote/invoice link as a comment."""
    comment = f"📋 Printavo Quote #{printavo_visual_id}\nhttps://app.printavo.com/quotes/{printavo_visual_id}"
    url = f"{BASE_URL}/task/{task_id}/comment"
    data = json.dumps({"comment_text": comment}).encode("utf-8")
    req = urllib.request.Request(
        url, data=data,
        headers={"Authorization": CLICKUP_TOKEN, "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"✅ Printavo quote #{printavo_visual_id} added as comment.")
    except urllib.error.HTTPError as e:
        print(f"❌ Comment error: {e.code} — {e.read().decode()}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a Lettuce Print ClickUp task")
    parser.add_argument("--company", required=True, help="Client company name")
    parser.add_argument("--contact", required=True, help="Client contact first name")
    parser.add_argument("--what", required=True, help="Short job description")
    parser.add_argument("--type", required=True, choices=["print", "apparel", "mixed"],
                        help="Job type")
    parser.add_argument("--deadline", help="Delivery date YYYY-MM-DD")
    parser.add_argument("--artwork", default="TBD", help="Artwork status")
    parser.add_argument("--items", help="JSON array of items (for print/apparel)")
    parser.add_argument("--print-items", help="JSON array of print items (for mixed)")
    parser.add_argument("--apparel-items", help="JSON array of apparel items (for mixed)")
    parser.add_argument("--ship-to", default="", help="Default ship to (for mixed jobs)")
    parser.add_argument("--urgent", action="store_true")
    parser.add_argument("--no-template", action="store_true",
                        help="Skip template and create blank task")
    parser.add_argument("--add-printavo", help="Task ID to add Printavo comment to")
    parser.add_argument("--printavo-id", help="Printavo visual ID to add as comment")

    args = parser.parse_args()

    if args.add_printavo and args.printavo_id:
        add_printavo_comment(args.add_printavo, args.printavo_id)
    else:
        print_items = None
        apparel_items = None

        if args.type == "print":
            raw = args.items or args.print_items
            if raw:
                print_items = json.loads(raw)
        elif args.type == "apparel":
            if args.items:
                apparel_items = json.loads(args.items)
        elif args.type == "mixed":
            if args.print_items:
                print_items = json.loads(args.print_items)
            if args.apparel_items:
                apparel_items = json.loads(args.apparel_items)

        create_task(
            company=args.company,
            contact=args.contact,
            what=args.what,
            job_type=args.type,
            deadline=args.deadline,
            artwork=args.artwork,
            print_items=print_items,
            apparel_items=apparel_items,
            urgent=args.urgent,
            use_template=not args.no_template
        )
