#!/usr/bin/env python3
"""
Lettuce Print — ClickUp Task Parser for Printavo Quotes
Parses a ClickUp task description and extracts all fields needed for Printavo quote creation.

Usage:
  python3 parse_clickup_for_printavo.py --task-id "868k185be"

Output: JSON with all parsed fields ready for Printavo API calls.
"""

import argparse
import json
import re
import urllib.request
import urllib.error

CLICKUP_TOKEN = "pk_87423040_0Q5FFGFP7WE4U0DQRJMK2CKNLRUC4A72"
BASE_URL = "https://api.clickup.com/api/v2"


def fetch_task(task_id):
    url = f"{BASE_URL}/task/{task_id}?include_subtasks=true"
    req = urllib.request.Request(
        url,
        headers={"Authorization": CLICKUP_TOKEN},
        method="GET"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"❌ Error fetching task: {e.code} — {e.read().decode()}")
        return None


def parse_task_name(name):
    """Parse '[Company] - [Contact] - [What]' format."""
    parts = name.split(" - ", 2)
    if len(parts) >= 3:
        return {
            "company": parts[0].strip(),
            "contact": parts[1].strip(),
            "what": parts[2].strip()
        }
    return {"company": name, "contact": "", "what": ""}


def parse_print_items(description):
    """Parse print items from the 📄 PRINT PROJECT DETAILS section."""
    items = []
    
    # Find the print section (case-insensitive, with or without emoji)
    print_match = re.search(
        r'(?:📄\s*)?[Pp][Rr][Ii][Nn][Tt]\s+[Pp][Rr][Oo][Jj][Ee][Cc][Tt]\s+[Dd][Ee][Tt][Aa][Ii][Ll][Ss]\s*(?:━━━━━━━━+)?\s*(.*?)(?=(?:👕\s*)?[Aa][Pp][Pp][Aa][Rr][Ee][Ll]\s+[Pp][Rr][Oo][Jj][Ee][Cc][Tt]\s+[Dd][Ee][Tt][Aa][Ii][Ll][Ss]|Ship To:|$)',
        description, re.DOTALL
    )
    if not print_match:
        return items
    
    section = print_match.group(1)
    
    # Split into individual items (look for "— Item N —" or just blocks)
    # The section starts with Customer Artwork line, so we need to split on the item markers
    item_blocks = re.split(r'— Item \d+ —\s*', section)
    
    for block in item_blocks:
        block = block.strip()
        if not block or block.startswith("Customer Artwork:"):
            continue
        
        item = {}
        
        # Extract fields using regex
        desc_match = re.search(r'Description:\s*(.*?)(?:\n|$)', block)
        if desc_match:
            item["description"] = desc_match.group(1).strip()
        
        size_match = re.search(r'Size:\s*(.*?)(?:\n|$)', block)
        if size_match:
            item["size"] = size_match.group(1).strip()
        
        stock_match = re.search(r'Stock:\s*(.*?)(?:\n|$)', block)
        if stock_match:
            item["stock"] = stock_match.group(1).strip()
        
        finish_match = re.search(r'Finish:\s*(.*?)(?:\n|$)', block)
        if finish_match:
            item["finish"] = finish_match.group(1).strip()
        
        qty_match = re.search(r'Quantity:\s*(.*?)(?:\n|$)', block)
        if qty_match:
            qty_str = qty_match.group(1).strip().replace(',', '')
            try:
                item["quantity"] = int(qty_str)
            except ValueError:
                item["quantity"] = qty_str
        
        single_match = re.search(r'Single Sided:\s*(.*?)(?:\n|$)', block)
        if single_match:
            val = single_match.group(1).strip()
            item["single_sided"] = val if val and not val.startswith('Lot:') else ''
        
        lot_match = re.search(r'Lot:\s*(.*?)(?:\n|$)', block)
        if lot_match:
            val = lot_match.group(1).strip()
            item["lot"] = val if val and not val.startswith('Price:') else ''
        
        price_match = re.search(r'Price:\s*(.*?)(?:\n|$)', block)
        if price_match:
            price_str = price_match.group(1).strip().replace('$', '').replace(',', '')
            try:
                item["price"] = float(price_str)
            except ValueError:
                item["price"] = price_str
        
        supplier_match = re.search(r'Supplier:\s*(.*?)(?:\n|$)', block)
        if supplier_match:
            item["supplier"] = supplier_match.group(1).strip()
        
        ship_match = re.search(r'Ship To:\s*(.*?)(?:\n|$)', block)
        if ship_match:
            item["ship_to"] = ship_match.group(1).strip()
        
        notes_match = re.search(r'Production Notes:\s*(.*?)(?:\n|$)', block)
        if notes_match:
            item["production_notes"] = notes_match.group(1).strip()
        
        if item.get("description"):
            items.append(item)
    
    return items


def parse_apparel_items(description):
    """Parse apparel items from the 👕 APPAREL PROJECT DETAILS section."""
    items = []
    
    # Find the apparel section (case-insensitive, with or without emoji)
    apparel_match = re.search(
        r'(?:👕\s*)?[Aa][Pp][Pp][Aa][Rr][Ee][Ll]\s+[Pp][Rr][Oo][Jj][Ee][Cc][Tt]\s+[Dd][Ee][Tt][Aa][Ii][Ll][Ss]\s*(?:━━━━━━━━+)?\s*(.*?)(?:Ship To:|$)',
        description, re.DOTALL
    )
    if not apparel_match:
        return items
    
    section = apparel_match.group(1)
    
    # Split into individual decorations
    # Some tasks don't use "— Decoration N —" markers, so split on Decoration Type:
    # But we need to be careful — the first block might be just "Customer Artwork:"
    # Split on "Decoration Type:" but keep the delimiter
    item_blocks = re.split(r'(?=Decoration Type:)', section)
    
    for block in item_blocks:
        block = block.strip()
        if not block or block.startswith("Customer Artwork:"):
            continue
        
        item = {}
        
        deco_match = re.search(r'Decoration Type:\s*(.*?)(?:\n|$)', block)
        if deco_match:
            item["decoration_type"] = deco_match.group(1).strip()
        
        brand_match = re.search(r'Blank Brand:\s*(.*?)(?:\n|$)', block)
        if brand_match:
            item["blank_brand"] = brand_match.group(1).strip()
        
        color_match = re.search(r'Blank Color:\s*(.*?)(?:\n(?=Print Locations:|Decoration Type:|$)|\Z)', block)
        if color_match:
            val = color_match.group(1).strip()
            # Don't capture the next field's label
            if val and not val.startswith('Print Locations:'):
                item["blank_color"] = val
        
        loc_match = re.search(r'Print Locations:\s*(.*?)(?:\n(?=Colors Per Artwork:|Decoration Type:|$)|\Z)', block)
        if loc_match:
            item["print_locations"] = loc_match.group(1).strip()
        
        colors_match = re.search(r'Colors Per Artwork:\s*(.*?)(?:\n|$)', block)
        if colors_match:
            item["colors_per_artwork"] = colors_match.group(1).strip()
        
        qty_match = re.search(r'QTY:\s*(.*?)(?:\n(?=Decoration Type:|$)|\Z)', block, re.DOTALL)
        if qty_match:
            qty_str = qty_match.group(1).strip().replace(',', '').replace('\n', ' ')
            # Try to extract the first number if multiple tiers
            qty_parts = qty_str.split()
            if qty_parts:
                try:
                    item["quantity"] = int(qty_parts[0])
                    item["quantity_tiers"] = qty_str
                except ValueError:
                    item["quantity"] = qty_str
        
        price_match = re.search(r'Price:\s*(.*?)(?:\n|$)', block)
        if price_match:
            price_str = price_match.group(1).strip().replace('$', '').replace(',', '')
            try:
                item["price"] = float(price_str)
            except ValueError:
                item["price"] = price_str
        
        supplier_match = re.search(r'Supplier:\s*(.*?)(?:\n|$)', block)
        if supplier_match:
            item["supplier"] = supplier_match.group(1).strip()
        
        ship_match = re.search(r'Ship To:\s*(.*?)(?:\n|$)', block)
        if ship_match:
            item["ship_to"] = ship_match.group(1).strip()
        
        notes_match = re.search(r'Production Notes:\s*(.*?)(?:\n|$)', block)
        if notes_match:
            item["production_notes"] = notes_match.group(1).strip()
        
        if item.get("decoration_type"):
            items.append(item)
    
    return items


def parse_ship_to(description):
    """Extract Ship To from end of description."""
    ship_match = re.search(r'Ship To:\s*(.*?)(?:\n|$)', description)
    if ship_match:
        return ship_match.group(1).strip()
    return ""


def parse_artwork_status(description):
    """Extract Customer Artwork status."""
    artwork_match = re.search(r'Customer Artwork:\s*(.*?)(?:\n|$)', description)
    if artwork_match:
        return artwork_match.group(1).strip()
    return "TBD"


def build_line_item_description(item, item_type="print"):
    """Build the full description string for Printavo line items."""
    if item_type == "print":
        parts = [
            item.get("description", ""),
            item.get("size", ""),
            item.get("stock", ""),
            item.get("finish", ""),
        ]
        desc = " | ".join(p for p in parts if p)
        if item.get("supplier"):
            desc += f" | Supplier: {item['supplier']}"
        return desc
    else:  # apparel
        parts = [
            item.get("decoration_type", ""),
            item.get("blank_brand", ""),
            item.get("blank_color", ""),
            item.get("print_locations", ""),
            item.get("colors_per_artwork", ""),
        ]
        desc = " | ".join(p for p in parts if p)
        if item.get("supplier"):
            desc += f" | Supplier: {item['supplier']}"
        return desc


def parse_clickup_task(task_id):
    """Main function: fetch and parse a ClickUp task for Printavo."""
    task = fetch_task(task_id)
    if not task:
        return None
    
    result = {
        "task_id": task_id,
        "task_name": task["name"],
        "task_url": task["url"],
        "status": task["status"]["status"],
        "due_date": task.get("due_date"),
        "parsed": parse_task_name(task["name"]),
        "artwork_status": parse_artwork_status(task.get("text_content", "")),
        "ship_to": parse_ship_to(task.get("text_content", "")),
        "print_items": parse_print_items(task.get("text_content", "")),
        "apparel_items": parse_apparel_items(task.get("text_content", "")),
    }
    
    # Add line item descriptions for Printavo
    for item in result["print_items"]:
        item["line_item_description"] = build_line_item_description(item, "print")
    for item in result["apparel_items"]:
        item["line_item_description"] = build_line_item_description(item, "apparel")
    
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Parse ClickUp task for Printavo quote")
    parser.add_argument("--task-id", required=True, help="ClickUp task ID")
    args = parser.parse_args()
    
    result = parse_clickup_task(args.task_id)
    if result:
        print(json.dumps(result, indent=2))
    else:
        print("❌ Failed to parse task")
