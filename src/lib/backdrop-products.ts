import type { ProductOrderPageProps } from '@/components/shop/ProductOrderPage'
// Customer prices only. Every supported combination has an explicit rule.
export const backdropProducts: Record<string, ProductOrderPageProps> = {
  "step-repeat-8x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "Premium Step and Repeat 8 × 8 ft.",
    "tagline": "Luxury adjustable telescopic stand. Our team checks every proof.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "Premium Step and Repeat 8 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Material",
        "options": [
          {
            "id": "vinyl",
            "label": "13 oz vinyl banner",
            "description": ""
          },
          {
            "id": "fabric",
            "label": "Oxford fabric (wrinkle-resistant)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 319,
        "rushPrice": 446.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Material": "vinyl"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 319,
            "rushPrice": 446.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Material": "fabric"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 349,
            "rushPrice": 488.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Material": "vinyl"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 159,
            "rushPrice": 222.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Material": "fabric"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 239,
            "rushPrice": 334.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 199,
            "rushPrice": 278.6
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "8 × 8 ft."
      },
      {
        "label": "Material",
        "value": "13 oz vinyl banner or Oxford fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/step-repeat.jpg",
        "alt": "Premium Step and Repeat 8 × 8 ft."
      }
    ]
  },
  "step-repeat-10x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "Premium Step and Repeat 10 × 8 ft.",
    "tagline": "Luxury adjustable telescopic stand. Our team checks every proof.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "Premium Step and Repeat 10 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Material",
        "options": [
          {
            "id": "vinyl",
            "label": "13 oz vinyl banner",
            "description": ""
          },
          {
            "id": "fabric",
            "label": "Oxford fabric (wrinkle-resistant)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 349,
        "rushPrice": 488.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Material": "vinyl"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 349,
            "rushPrice": 488.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Material": "fabric"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 399,
            "rushPrice": 558.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Material": "vinyl"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 189,
            "rushPrice": 264.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Material": "fabric"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 329,
            "rushPrice": 460.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 199,
            "rushPrice": 278.6
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "10 × 8 ft."
      },
      {
        "label": "Material",
        "value": "13 oz vinyl banner or Oxford fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/step-repeat.jpg",
        "alt": "Premium Step and Repeat 10 × 8 ft."
      }
    ]
  },
  "eurofit-8x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "EuroFit Backdrop 8 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Double-sided at no extra cost.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "EuroFit Backdrop 8 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Sides",
        "options": [
          {
            "id": "single",
            "label": "Single-sided",
            "description": ""
          },
          {
            "id": "double",
            "label": "Double-sided",
            "description": "Double-sided at no extra cost."
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "Bottom zipper",
        "options": [
          {
            "id": "none",
            "label": "No bottom zipper",
            "description": ""
          },
          {
            "id": "zipper",
            "label": "Bottom zipper (+$49)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "LED",
        "options": [
          {
            "id": "0",
            "label": "No LED lights",
            "description": ""
          },
          {
            "id": "1",
            "label": "1 LED light (+$99)",
            "description": ""
          },
          {
            "id": "2",
            "label": "2 LED lights (+$199)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "hardware"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 649,
        "rushPrice": 908.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "none",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 649,
            "rushPrice": 908.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "none",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 748,
            "rushPrice": 1047.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "none",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 848,
            "rushPrice": 1187.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "zipper",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 698,
            "rushPrice": 977.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "zipper",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 797,
            "rushPrice": 1115.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "zipper",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 897,
            "rushPrice": 1255.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "none",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 649,
            "rushPrice": 908.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "none",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 748,
            "rushPrice": 1047.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "none",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 848,
            "rushPrice": 1187.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "zipper",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 698,
            "rushPrice": 977.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "zipper",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 797,
            "rushPrice": 1115.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "zipper",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 897,
            "rushPrice": 1255.8
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single",
          "Bottom zipper": "none"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 399,
            "rushPrice": 558.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single",
          "Bottom zipper": "zipper"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 448,
            "rushPrice": 627.2
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double",
          "Bottom zipper": "none"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 399,
            "rushPrice": 558.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double",
          "Bottom zipper": "zipper"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 448,
            "rushPrice": 627.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 279,
            "rushPrice": 390.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 378,
            "rushPrice": 529.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 478,
            "rushPrice": 669.2
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "8 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/seg-lightbox.jpg",
        "alt": "EuroFit Backdrop 8 × 8 ft."
      }
    ]
  },
  "eurofit-10x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "EuroFit Backdrop 10 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Double-sided at no extra cost.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "EuroFit Backdrop 10 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Sides",
        "options": [
          {
            "id": "single",
            "label": "Single-sided",
            "description": ""
          },
          {
            "id": "double",
            "label": "Double-sided",
            "description": "Double-sided at no extra cost."
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "Bottom zipper",
        "options": [
          {
            "id": "none",
            "label": "No bottom zipper",
            "description": ""
          },
          {
            "id": "zipper",
            "label": "Bottom zipper (+$49)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "LED",
        "options": [
          {
            "id": "0",
            "label": "No LED lights",
            "description": ""
          },
          {
            "id": "1",
            "label": "1 LED light (+$99)",
            "description": ""
          },
          {
            "id": "2",
            "label": "2 LED lights (+$199)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "hardware"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 719,
        "rushPrice": 1006.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "none",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 719,
            "rushPrice": 1006.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "none",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 818,
            "rushPrice": 1145.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "none",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 918,
            "rushPrice": 1285.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "zipper",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 768,
            "rushPrice": 1075.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "zipper",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 867,
            "rushPrice": 1213.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "single",
          "Bottom zipper": "zipper",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 967,
            "rushPrice": 1353.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "none",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 719,
            "rushPrice": 1006.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "none",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 818,
            "rushPrice": 1145.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "none",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 918,
            "rushPrice": 1285.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "zipper",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 768,
            "rushPrice": 1075.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "zipper",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 867,
            "rushPrice": 1213.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double",
          "Bottom zipper": "zipper",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 967,
            "rushPrice": 1353.8
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single",
          "Bottom zipper": "none"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 449,
            "rushPrice": 628.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single",
          "Bottom zipper": "zipper"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 498,
            "rushPrice": 697.2
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double",
          "Bottom zipper": "none"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 449,
            "rushPrice": 628.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double",
          "Bottom zipper": "zipper"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 498,
            "rushPrice": 697.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 309,
            "rushPrice": 432.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "1"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 408,
            "rushPrice": 571.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 508,
            "rushPrice": 711.2
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "10 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/seg-lightbox.jpg",
        "alt": "EuroFit Backdrop 10 × 8 ft."
      }
    ]
  },
  "popup-8x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "Pop-Up Display 8 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Choose straight or wrap styling.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "Pop-Up Display 8 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Style",
        "options": [
          {
            "id": "straight",
            "label": "Straight",
            "description": ""
          },
          {
            "id": "wrap",
            "label": "Wrap (+$40)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "Fabric",
        "options": [
          {
            "id": "white",
            "label": "White-back stretch 9 oz",
            "description": ""
          },
          {
            "id": "black",
            "label": "Black-back blockout (+$79)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "LED",
        "options": [
          {
            "id": "0",
            "label": "No LED lights",
            "description": ""
          },
          {
            "id": "2",
            "label": "2 LED lights (+$199)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "hardware"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 649,
        "rushPrice": 908.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 649,
            "rushPrice": 908.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 848,
            "rushPrice": 1187.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 728,
            "rushPrice": 1019.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 927,
            "rushPrice": 1297.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 689,
            "rushPrice": 964.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 888,
            "rushPrice": 1243.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 768,
            "rushPrice": 1075.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 967,
            "rushPrice": 1353.8
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "straight",
          "Fabric": "white"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 379,
            "rushPrice": 530.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "straight",
          "Fabric": "black"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 458,
            "rushPrice": 641.2
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "wrap",
          "Fabric": "white"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 419,
            "rushPrice": 586.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "wrap",
          "Fabric": "black"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 498,
            "rushPrice": 697.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 319,
            "rushPrice": 446.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 518,
            "rushPrice": 725.2
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "8 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/popup.jpg",
        "alt": "Pop-Up Display 8 × 8 ft."
      }
    ]
  },
  "popup-10x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "Pop-Up Display 10 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Choose straight or wrap styling.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "Pop-Up Display 10 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Style",
        "options": [
          {
            "id": "straight",
            "label": "Straight",
            "description": ""
          },
          {
            "id": "wrap",
            "label": "Wrap (+$40)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "Fabric",
        "options": [
          {
            "id": "white",
            "label": "White-back stretch 9 oz",
            "description": ""
          },
          {
            "id": "black",
            "label": "Black-back blockout (+$79)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "LED",
        "options": [
          {
            "id": "0",
            "label": "No LED lights",
            "description": ""
          },
          {
            "id": "2",
            "label": "2 LED lights (+$199)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "hardware"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 699,
        "rushPrice": 978.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 699,
            "rushPrice": 978.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 898,
            "rushPrice": 1257.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 778,
            "rushPrice": 1089.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 977,
            "rushPrice": 1367.8
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 739,
            "rushPrice": 1034.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 938,
            "rushPrice": 1313.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 818,
            "rushPrice": 1145.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1017,
            "rushPrice": 1423.8
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "straight",
          "Fabric": "white"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 379,
            "rushPrice": 530.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "straight",
          "Fabric": "black"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 458,
            "rushPrice": 641.2
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "wrap",
          "Fabric": "white"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 419,
            "rushPrice": 586.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "wrap",
          "Fabric": "black"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 498,
            "rushPrice": 697.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 329,
            "rushPrice": 460.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 528,
            "rushPrice": 739.2
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "10 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/popup.jpg",
        "alt": "Pop-Up Display 10 × 8 ft."
      }
    ]
  },
  "popup-20x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "Pop-Up Display 20 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Choose straight or wrap styling.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "Pop-Up Display 20 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Style",
        "options": [
          {
            "id": "straight",
            "label": "Straight",
            "description": ""
          },
          {
            "id": "wrap",
            "label": "Wrap (+$80)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "Fabric",
        "options": [
          {
            "id": "white",
            "label": "White-back stretch 9 oz",
            "description": ""
          },
          {
            "id": "black",
            "label": "Black-back blockout (+$149)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      },
      {
        "label": "LED",
        "options": [
          {
            "id": "0",
            "label": "No LED lights",
            "description": ""
          },
          {
            "id": "2",
            "label": "2 LED lights (+$199)",
            "description": ""
          },
          {
            "id": "3",
            "label": "3 LED lights (+$299)",
            "description": ""
          },
          {
            "id": "4",
            "label": "4 LED lights (+$399)",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "hardware"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 1495,
        "rushPrice": 2093
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1495,
            "rushPrice": 2093
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1694,
            "rushPrice": 2371.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "3"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1794,
            "rushPrice": 2511.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "white",
          "LED": "4"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1894,
            "rushPrice": 2651.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1644,
            "rushPrice": 2301.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1843,
            "rushPrice": 2580.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "3"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1943,
            "rushPrice": 2720.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "straight",
          "Fabric": "black",
          "LED": "4"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 2043,
            "rushPrice": 2860.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1575,
            "rushPrice": 2205
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1774,
            "rushPrice": 2483.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "3"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1874,
            "rushPrice": 2623.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "white",
          "LED": "4"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1974,
            "rushPrice": 2763.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1724,
            "rushPrice": 2413.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1923,
            "rushPrice": 2692.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "3"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 2023,
            "rushPrice": 2832.2
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Style": "wrap",
          "Fabric": "black",
          "LED": "4"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 2123,
            "rushPrice": 2972.2
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "straight",
          "Fabric": "white"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 749,
            "rushPrice": 1048.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "straight",
          "Fabric": "black"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 898,
            "rushPrice": 1257.2
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "wrap",
          "Fabric": "white"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 829,
            "rushPrice": 1160.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Style": "wrap",
          "Fabric": "black"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 978,
            "rushPrice": 1369.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "0"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 849,
            "rushPrice": 1188.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "2"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1048,
            "rushPrice": 1467.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "3"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1148,
            "rushPrice": 1607.2
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware",
          "LED": "4"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1248,
            "rushPrice": 1747.2
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "20 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/popup.jpg",
        "alt": "Pop-Up Display 20 × 8 ft."
      }
    ]
  },
  "seg-10x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "SEG Pop-Up Stand 10 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Not backlit.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "SEG Pop-Up Stand 10 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Sides",
        "options": [
          {
            "id": "single",
            "label": "Single-sided",
            "description": ""
          },
          {
            "id": "double",
            "label": "Double-sided",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 1249,
        "rushPrice": 1748.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Sides": "single"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1249,
            "rushPrice": 1748.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1449,
            "rushPrice": 2028.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 459,
            "rushPrice": 642.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 749,
            "rushPrice": 1048.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 749,
            "rushPrice": 1048.6
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "10 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/seg-lightbox.jpg",
        "alt": "SEG Pop-Up Stand 10 × 8 ft."
      }
    ]
  },
  "seg-8x10": {
    "backdrop": true,
    "showQuantity": true,
    "name": "SEG Pop-Up Stand 8 × 10 ft.",
    "tagline": "Dye-sublimated fabric display. Not backlit.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "SEG Pop-Up Stand 8 × 10 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Sides",
        "options": [
          {
            "id": "single",
            "label": "Single-sided",
            "description": ""
          },
          {
            "id": "double",
            "label": "Double-sided",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 1249,
        "rushPrice": 1748.6
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Sides": "single"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1249,
            "rushPrice": 1748.6
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1449,
            "rushPrice": 2028.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 459,
            "rushPrice": 642.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 749,
            "rushPrice": 1048.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 749,
            "rushPrice": 1048.6
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "8 × 10 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/seg-lightbox.jpg",
        "alt": "SEG Pop-Up Stand 8 × 10 ft."
      }
    ]
  },
  "seg-20x8": {
    "backdrop": true,
    "showQuantity": true,
    "name": "SEG Pop-Up Stand 20 × 8 ft.",
    "tagline": "Dye-sublimated fabric display. Not backlit.",
    "parentHref": "/services/signage/backdrops",
    "breadcrumb": [
      {
        "label": "Backdrops",
        "href": "/services/signage/backdrops"
      },
      {
        "label": "SEG Pop-Up Stand 20 × 8 ft.",
        "href": ""
      }
    ],
    "color": "#E8F0F5",
    "optionGroups": [
      {
        "label": "Package",
        "options": [
          {
            "id": "kit",
            "label": "Full kit (frame + graphic)",
            "description": ""
          },
          {
            "id": "graphic",
            "label": "Graphic only (replacement print)",
            "description": "No frame."
          },
          {
            "id": "hardware",
            "label": "Hardware only (frame, no print)",
            "description": ""
          }
        ]
      },
      {
        "label": "Sides",
        "options": [
          {
            "id": "single",
            "label": "Single-sided",
            "description": ""
          },
          {
            "id": "double",
            "label": "Double-sided",
            "description": ""
          }
        ],
        "packages": [
          "kit",
          "graphic"
        ]
      }
    ],
    "pricingTable": [
      {
        "qty": 1,
        "standardPrice": 2395,
        "rushPrice": 3353
      }
    ],
    "pricingRules": [
      {
        "selections": {
          "Package": "kit",
          "Sides": "single"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 2395,
            "rushPrice": 3353
          }
        ]
      },
      {
        "selections": {
          "Package": "kit",
          "Sides": "double"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 2795,
            "rushPrice": 3913
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "single"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 899,
            "rushPrice": 1258.6
          }
        ]
      },
      {
        "selections": {
          "Package": "graphic",
          "Sides": "double"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1549,
            "rushPrice": 2168.6
          }
        ]
      },
      {
        "selections": {
          "Package": "hardware"
        },
        "pricingTable": [
          {
            "qty": 1,
            "standardPrice": 1495,
            "rushPrice": 2093
          }
        ]
      }
    ],
    "specs": [
      {
        "label": "Size",
        "value": "20 × 8 ft."
      },
      {
        "label": "Material",
        "value": "Dye-sublimated fabric"
      }
    ],
    "artworkRequirements": [
      {
        "label": "Preferred formats",
        "value": "AI, PDF, EPS"
      },
      {
        "label": "Accepted formats",
        "value": "PSD, PNG, JPG (300 DPI min)"
      }
    ],
    "included": [
      "Team proof review before print production",
      "Quality check before shipping",
      "Frame and/or graphic as selected"
    ],
    "images": [
      {
        "src": "/images/products/backdrops/seg-lightbox.jpg",
        "alt": "SEG Pop-Up Stand 20 × 8 ft."
      }
    ]
  }
}
