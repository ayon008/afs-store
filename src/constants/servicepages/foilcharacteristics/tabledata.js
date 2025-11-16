const tableData = {
  all: [
    {
      "product": "Silk monoblock wing",
      "headers": [
        "Surface area (cm²)", "Span (mm)", "Aspect Ratio", "Maximum cord (mm)",
        "Maximum thickness (mm)", "Length (mm) (Wing trailing edge / fuselage end)",
        "Construction", "Weight (kg)", "Screws and bolts"
      ],
      "rows": [
        {
          "model": "Silk 650",
          "Surface area (cm²)": "650",
          "Span (mm)": "720",
          "Aspect Ratio": "8",
          "Maximum cord (mm)": "115",
          "Maximum thickness (mm)": "13,7",
          "Length (mm) (Wing trailing edge / fuselage end)": "572",
          "Construction": "UHM Carbon / Corecell core",
          "Weight (kg)": "0.9",
          "Screws and bolts": "NA"
        },
        {
          "model": "Silk 850",
          "Surface area (cm²)": "850",
          "Span (mm)": "824",
          "Aspect Ratio": "8",
          "Maximum cord (mm)": "134",
          "Maximum thickness (mm)": "16",
          "Length (mm) (Wing trailing edge / fuselage end)": "555",
          "Construction": "UHM Carbon / Corecell core",
          "Weight (kg)": "0.96",
          "Screws and bolts": "NA"
        },
        {
          "model": "Silk 1050",
          "Surface area (cm²)": "1050",
          "Span (mm)": "916",
          "Aspect Ratio": "8",
          "Maximum cord (mm)": "150",
          "Maximum thickness (mm)": "17,9",
          "Length (mm) (Wing trailing edge / fuselage end)": "538",
          "Construction": "UHM Carbon / Corecell core",
          "Weight (kg)": "1.0",
          "Screws and bolts": "NA"
        }
      ]
    },
    {
      "product": "Dismountable Silk wing",
      "headers": [
        "Surface area (cm²)", "Span (mm)", "Aspect Ratio", "Maximum cord (mm)",
        "Maximum thickness (mm)", "Construction", "Weight (kg)", "Screws and bolts"
      ],
      "rows": [
        {
          "model": "Silk 850",
          "Surface area (cm²)": "850",
          "Span (mm)": "824",
          "Aspect Ratio": "8",
          "Maximum cord (mm)": "134",
          "Maximum thickness (mm)": "16",
          "Construction": "HR Carbon / Corecell",
          "Weight (kg)": "0.7",
          "Screws and bolts": "M8x20mm Torx40 countersunk head"
        },
        {
          "model": "Silk 1050",
          "Surface area (cm²)": "1050",
          "Span (mm)": "916",
          "Aspect Ratio": "8",
          "Maximum cord (mm)": "150",
          "Maximum thickness (mm)": "17,9",
          "Construction": "HR Carbon / Corecell",
          "Weight (kg)": "0.8",
          "Screws and bolts": "M8x20mm Torx40 countersunk head"
        }
      ]
    },
    {
      "product": "Ultra monobloc",
      "headers": [
        "Surface area (cm²)", "Span (mm)", "Aspect Ratio", "Maximum cord (mm)",
        "Maximum thickness (mm)", "Length (mm) (Wing trailing edge / fuselage end)",
        "Construction", "Weight (kg)", "Screws and bolts"
      ],
      "rows": [
        {
          "model": "Ultra 750",
          "Surface area (cm²)": "750",
          "Span (mm)": "1024",
          "Aspect Ratio": "14",
          "Maximum cord (mm)": "95",
          "Maximum thickness (mm)": "12.3",
          "Length (mm) (Wing trailing edge / fuselage end)": "579",
          "Construction": "UHM and HM Carbon",
          "Weight (kg)": "1.2",
          "Screws and bolts": "NA"
        }
      ]
    },
    {
      "product": "Enduro Front Wing",
      "headers": [
        "Surface area (cm²)", "Span (mm)", "Aspect Ratio", "Maximum cord (mm)",
        "Maximum thickness (mm)", "Construction", "Weight (kg)", "Screws and bolts"
      ],
      "rows": [
        {
          "model": "Enduro 1600 GLT",
          "Surface area (cm²)": "1600",
          "Span (mm)": "1323",
          "Aspect Ratio": "11",
          "Maximum cord (mm)": "162",
          "Maximum thickness (mm)": "19",
          "Construction": "HR Carbon / Corecell",
          "Weight (kg)": "1.4",
          "Screws and bolts": "M8x20mm Torx40 countersunk head"
        },
        {
          "model": "Enduro 1300",
          "Surface area (cm²)": "1300",
          "Span (mm)": "1190",
          "Aspect Ratio": "11",
          "Maximum cord (mm)": "149",
          "Maximum thickness (mm)": "17.8",
          "Construction": "HR Carbon / Corecell",
          "Weight (kg)": "1",
          "Screws and bolts": "M8x20mm Torx40 countersunk head"
        }
      ]
    },
    {
      "product": "Pure Fuselink monoblock wing",
      "headers": [
        "Surface area (cm²)", "Span (mm)", "Aspect Ratio", "Maximum cord (mm)",
        "Maximum thickness (mm)", "Length (Wing trailing edge / fuselage end)",
        "Construction", "Weight (kg)", "Screws and bolts"
      ],
      "rows": [
        {
          "model": "Pure 560",
          "Surface area (cm²)": "560 front wing / stabilizer",
          "Span (mm)": "750",
          "Aspect Ratio": "10",
          "Maximum cord (mm)": "-",
          "Maximum thickness (mm)": "-",
          "Length (Wing trailing edge / fuselage end)": "667mm",
          "Construction": "UHM Carbon / HM Carbon",
          "Weight (kg)": "1.2",
          "Screws and bolts": "NA"
        }
      ]
    }
  ],

  foil: [
    {
      productName: "Silk monoblock wing",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Length (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Silk 650", values: [650, 720, 8, 115, 13.7, 572, "UHM Carbon / Corecell core", 0.9, "NA"] },
        { model: "Silk 850", values: [850, 824, 8, 134, 16, 555, "UHM Carbon / Corecell core", 0.96, "NA"] },
        { model: "Silk 1050", values: [1050, 916, 8, 150, 17.9, 538, "UHM Carbon / Corecell core", 1.0, "NA"] }
      ]
    },
    {
      productName: "Dismountable Silk wing",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Silk 850", values: [850, 824, 8, 134, 16, "HR Carbon / Corecell", 0.7, "M8x20mm Torx40 countersunk head"] },
        { model: "Silk 1050", values: [1050, 916, 8, 150, 17.9, "HR Carbon / Corecell", 0.8, "M8x20mm Torx40 countersunk head"] }
      ]
    },
    {
      productName: "Ultra monobloc",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Length (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Ultra 750", values: [750, 1024, 14, 95, 12.3, 579, "UHM and HM Carbon", 1.2, "NA"] }
      ]
    },
    {
      productName: "Enduro Front Wing",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Enduro 1600 GLT", values: [1600, 1323, 11, 162, 19, "HR Carbon / Corecell", 1.4, "M8x20mm Torx40 countersunk head"] },
        { model: "Enduro 1300", values: [1300, 1190, 11, 149, 17.8, "HR Carbon / Corecell", 1.0, "M8x20mm Torx40 countersunk head"] },
        { model: "Enduro 1100", values: [1100, 1100, 11, 136, 16.2, "HR Carbon / Corecell", 0.9, "M8x20mm Torx40 countersunk head"] },
        { model: "Enduro 1000", values: [1000, 1050, 11, 129.5, 15.5, "HR Carbon / Corecell", 0.85, "M8x20mm Torx40 countersunk head"] },
        { model: "Enduro 900", values: [900, 994, 11, 122, 14.6, "HR Carbon / Corecell", 0.8, "M8x20mm Torx40 countersunk head"] },
        { model: "Enduro 800", values: [800, 940, 11, 116, 13.9, "HR Carbon / Corecell", 0.65, "M8x20mm Torx40 countersunk head"] },
        { model: "Enduro 700", values: [700, 877, 11, 108, 12.9, "HR Carbon / Corecell", 0.5, "M8x20mm Torx40 countersunk head"] }
      ]
    },
    {
      productName: "Pure Fuselink monoblock wing",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Length (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Pure 560", values: ["560 front wing / stabilizer", 750, 10, "-", "-", 667, "UHM Carbon / HM Carbon", 1.2, "NA"] },
        { model: "Pure HA 800", values: [800, 1000, 13, 100, 11.6, 572, "HM Carbon", 1.4, "NA"] },
        { model: "Pure HA 1100", values: [1100, 1100, 11, 125, 14.5, 553, "HM Carbon", 1.5, "NA"] },
        { model: "Pure 700", values: [700, 820, 9.6, 112, 11.5, 574, "HM Carbon", 1.2, "NA"] },
        { model: "Pure 900", values: [880, 900, 9.2, 137, 14.1, 555, "HM Carbon", 1.7, "NA"] }
      ]
    },
    {
      productName: "Evo wing",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Evo 950", values: [950, 880, 8.1, 150, 13.5, "HR Carbon / Corecell", 0.7, "M8x20mm Torx40 countersunk head"] },
        { model: "Evo 1250", values: [1240, 970, 7.6, 185, 16.5, "HR Carbon / Corecell", 0.8, "M8x20mm Torx40 countersunk head"] },
        { model: "Evo 1450", values: [1440, 1040, 7.6, 195, 17.5, "HR Carbon / Corecell", 1.0, "M8x20mm Torx40 countersunk head"] },
        { model: "Evo 1650", values: [1640, 1110, 7.5, 195, 17.5, "HR Carbon / Corecell", 1.1, "M8x20mm Torx40 countersunk head"] },
        { model: "Evo HA 750", values: [750, 1000, 13.3, 113, 13.8, "HR Carbon / HM Carbon / Monolithic", 0.7, "M8x20mm Torx40 countersunk head"] },
        { model: "Evo HA 1000", values: [1000, 1100, 12.1, 135, 16, "HR Carbon / HM Carbon / Monolithic", 1.1, "M8x20mm Torx40 countersunk head"] }
      ]
    },
    {
      productName: "Fuselage Evo",
      headers: ["Length", "Construction", "Weight (kg)", "Stab position"],
      rows: [
        { model: "Fuselink standard", values: ["680mm (overall)", "Monolithic HR carbon", 0.6, "2 positions"] },
        { model: "Fuselink Short", values: ["650mm (overall)", "Monolithic HR carbon", 0.6, "2 positions"] },
        { model: "Switch", values: ["680mm (overall)", "Monolithic HR carbon", 0.6, "2 positions"] }
      ]
    },
    {
      productName: "Flyer V2 front wing",
      headers: [
        "Surface area (cm²)",
        "Span (mm)",
        "Aspect Ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Flyer 1500", values: [1430, 955, 6.3, 185, 20, "HR Carbon / Corecell", 0.8, "M8x20mm Torx40 countersunk head"] },
        { model: "Flyer 1800", values: [1735, 1050, 6.3, 205, 22, "HR Carbon / Corecell", 0.8, "M8x20mm Torx40 countersunk head"] }
      ]
    },
    {
      productName: "Fuselink masts",
      headers: ["Length", "Minimum cord (mm)", "Minimum thickness (mm)", "Construction", "Weight (kg)", "Screws and bolts"],
      rows: [
        { model: "80 HR", values: ["80 cm", 135, "16 (±0.1)", "HR carbon / Corecell core", 1.6, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "80 HM", values: ["80 cm", 120, "15 (±0.1)", "HM carbon / Corecell core", 1.9, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "85 HM", values: ["85 cm", 120, "15 (±0.1)", "HM carbon / Corecell core", 1.6, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "80 UHM", values: ["80 cm", 115, "13.8 (±0.1)", "UHM carbon / Corecell core", 2.0, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "85 UHM", values: ["85 cm", 115, "13.5 (±0.1)", "UHM carbon / Corecell core", 2.0, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "95 UHM", values: ["95 cm", 115, "14.0 (±0.1)", "UHM Carbon / Corecell Core", 2.3, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "95 UHM RACE", values: ["95 cm", 120, "12.3 (±0.1)", "Carbon UHM / Monolithic", 2.3, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "75 UHM SKINNY", values: ["75 cm", 100, "12.8 (±0.1)", "UHM carbon / Corecell core", 1.5, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] },
        { model: "85 UHM Skinny", values: ["85 cm", 105, "13.2 (±0.1)", "Carbon UHM / Monolithic", 1.9, "M8x45mm Torx 40 countersunk head (mast/fuselage) M8x30mm Torx 45 dome head (mast/plate)"] }
      ]
    },
    {
      productName: "Silk stabilizer",
      headers: [
        "Surface (cm²)",
        "Span (mm)",
        "Aspect ratio",
        "Maximum cord (mm)",
        "Maximum thickness (mm)",
        "Construction",
        "Weight (kg)",
        "Screws and bolts"
      ],
      rows: [
        { model: "Silk 132", values: [132, 310, 7.2, 58.8, 7.1, "HR Carbon", 0.1, "M6x12mm Torx 30 countersunk head"] },
        { model: "Silk 142", values: [142, 330, 7.8, 58, 7.0, "HR Carbon", 0.1, "M6x12mm Torx 30 countersunk head"] },
        { model: "Silk 152", values: [152, 350, 8, 57.3, 6.9, "HR Carbon", 0.1, "M6x12mm Torx 30 countersunk head"] },
        { model: "Silk HA 38", values: [135, 380, 11.9, 43, 6.5, "HR Carbon", 0.09, "M6x12mm Torx 30 countersunk head"] }
      ]
    }
  ],

  board: [
    {
      title: "AFS Advanced board features",
      category: "planche",
      headers: [
        "Length (cm)",
        "Width (cm)",
        "Max thickness (cm)",
        "Volume (liter)",
        "Construction",
        "Rail",
        "Weight (kg)"
      ],
      rows: [
        {
          model: "Dock Star",
          values: [
            83, 
            38.5, 
            3, 
            "7L", 
            "Pre-preg carbon / High-density Corecell foam / double stringer", 
            "Rail US 250mm", 
            1.75
          ]
        }
      ]
    }
  ],

  previousRange: [
    {
      title: "Previous range (performer / flyer v1)",
      tables: [
        {
          name: "Performer Surf stabilizer",
          category: "gamme",
          headers: [
            "Surface (cm²)",
            "Span (mm)",
            "Aspect ratio",
            "Maximum cord (mm)",
            "Maximum thickness (mm)",
            "Construction",
            "Weight (kg)",
            "Screw size",
            "Compatibility"
          ],
          rows: [
            {
              model: "Performer Surf 160",
              values: [160, 361, 8.1, 82, 8.9, "HR Carbon", 0.14, "16mm (Performer fuselage)", "All fuselages"]
            },
            {
              model: "Performer Surf 190",
              values: [190, 384, 7.7, 66.5, 9.4, "HR Carbon", 0.16, "16mm (Performer fuselage)", "All fuselages"]
            }
          ]
        },
        {
          name: "Performer RS stabilizers",
          category: "gamme",
          headers: [
            "Surface (cm²)",
            "Span (mm)",
            "Aspect ratio",
            "Maximum cord (mm)",
            "Maximum thickness (mm)",
            "Construction",
            "Weight (kg)",
            "Screw size",
            "Compatibility"
          ],
          rows: [
            {
              model: "Performer RS 230",
              values: [230, 435, 8.2, 58.8, 7.10, "HR Carbon", 0.16, "16mm (Performer fuselage)", "All fuselages"]
            },
            {
              model: "Performer RS 260",
              values: [260, 480, 8.8, 58.8, 7.10, "HR Carbon", 0.16, "16mm (Performer fuselage)", "All fuselages"]
            }
          ]
        },
        {
          name: "Performer masts",
          category: "gamme",
          headers: [
            "Length",
            "Minimum cord (mm)",
            "Minimum thickness (mm)",
            "Construction",
            "Weight (kg)",
            "Screw size (mast/fuselage)"
          ],
          rows: [
            { model: "Performer 78 HM", values: ["78 cm", 120, 14.3, "HM Carbon", 1.7, "Depends on fuselage (Performer or Pure)"] },
            { model: "Performer 78 UHM", values: ["78 cm", 120, 14.3, "UHM Carbon", 1.78, "-"] },
            { model: "Performer 85 HM", values: ["85 cm", 120, 14.3, "HM Carbon", 1.72, "-"] },
            { model: "Performer 85 UHM", values: ["85 cm", 120, 15.3, "UHM Carbon", 1.9, "-"] },
            { model: "Performer 97 HM", values: ["97 cm", 120, 15.3, "HM Carbon", 2.1, "-"] },
            { model: "Performer 97 UHM", values: ["97 cm", 120, 15.3, "UHM Carbon", 2.3, "-"] },
            { model: "Performer 107 HM", values: ["107 cm", 120, 15.3, "HM Carbon", 2.15, "-"] },
            { model: "Performer 107 UHM", values: ["107 cm", 120, 15.3, "UHM Carbon", 2.4, "-"] },
            { model: "Silk 80 cm", values: ["80 cm", 115, 13.8, "UHM Carbon", 1.74, "-"] },
            { model: "Pure 560 95 cm", values: ["95 cm", 120, 12.3, "UHM Carbon", 2.05, "-"] },
            { model: "Alpha 75", values: ["75 cm", 135, 16, "Carbon Prepreg", 1.7, "-"] },
            { model: "Alpha 85", values: ["85 cm", 135, 16, "Carbon Prepreg", 1.9, "-"] }
          ]
        },
        {
          name: "Flyer V1 front wing",
          category: "gamme",
          headers: [
            "Surface (cm²)",
            "Span (mm)",
            "Aspect Ratio",
            "Maximum cord (mm)",
            "Maximum thickness (mm)",
            "Construction",
            "Weight of the complete film (kg)",
            "Screw size"
          ],
          rows: [
            { model: "Flyer 850", values: [850, 800, 7.3, 152, 18.8, "HR Carbon", 3.1, "25mm Fuselage Performer"] },
            { model: "Flyer 1000", values: [1000, 840, 7.1, 139, 19.5, "HR Carbon", 3.1, "25mm Fuselage Performer"] },
            { model: "Flyer 1300", values: [1300, 1000, 7.7, 133, 20, "HR Carbon", 3.0, "25mm Fuselage Performer"] }
          ]
        },
        {
          name: "Performer wing",
          category: "gamme",
          headers: [
            "Surface (cm²)",
            "Span (mm)",
            "Aspect Ratio",
            "Maximum cord (mm)",
            "Maximum thickness (mm)",
            "Construction",
            "Weight (kg)",
            "Screw size"
          ],
          rows: [
            { model: "Performer 750", values: [750, 750, 7.5, 118, 11.88, "HR Carbon / Corecell", 0.62, "25mm Fuselage Performer"] },
            { model: "Performer 950", values: [950, 840, 7.4, 133.65, 12.28, "HR Carbon / Corecell", 0.62, "25mm Fuselage Performer"] },
            { model: "Performer 1250", values: [1250, 950, 7.2, 165, 17.9, "HR Carbon / Corecell", 0.7, "25mm Fuselage Performer"] },
            { model: "Performer 1450", values: [1450, 970, 6.5, 187, 19.1, "HR Carbon / Corecell", 0.92, "25mm Fuselage Performer"] },
            { model: "Performer 1950", values: [1950, 990, 5.9, 207, 19.4, "HR Carbon / Corecell", 1.02, "25mm Fuselage Performer"] },
            { model: "Performer 1900", values: [1900, 1025, 5.7, 225, 21, "HR Carbon / Corecell", 1.2, "25mm Fuselage Performer"] }
          ]
        },
        {
          name: "Pure monoblock wing (performer docking)",
          category: "gamme",
          headers: [
            "Surface (cm²)",
            "Span (mm)",
            "Aspect Ratio",
            "Maximum cord (mm)",
            "Maximum thickness (mm)",
            "Length (mm)",
            "Construction",
            "Weight (kg)",
            "Mast screw size"
          ],
          rows: [
            { model: "Pure 700", values: [700, 750, 8, 120, 12, 510, "UHM Kevlar Carbon", 1.75, "M8x45mm Torx 45"] },
            { model: "Pure 900", values: [900, 880, 9, 130, 12, 600, "UHM Kevlar Carbon", 1.8, "M8x45mm Torx 45"] },
            { model: "Pure HA 800", values: [800, 1000, 13, 100, 11.6, 592, "UHM Kevlar Carbon", 1.35, "M8x45mm Torx 45"] }
          ]
        }
      ]
    }
  ]
};

export default tableData;