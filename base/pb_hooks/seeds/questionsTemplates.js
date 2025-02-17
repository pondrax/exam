
module.exports = [
  {
    "id": "template_default",
    "name": "Template Default",
    "description": "Template Default Memuat Standar Tahapan ujian",
    "stages": [
      {
        "id": "1",
        "name": "Tes Administrasi",
        "related": [
          { "id": "test_administrasi", "number": 0 }
        ]
      },
      {
        "id": "2",
        "name": "Tes Kompetensi Dasar",
        "related": [
          { "id": "test_tiu", "number": 50 },
          { "id": "test_twk", "number": 50 },
          { "id": "test_tkp", "number": 50 },
        ]
      },
      {
        "id": "3",
        "name": "Tes Kompetensi Bidang",
        "related": [
          { "id": "test_skb", "number": 50 }
        ]
      },
      {
        "id": "4",
        "name": "Tes Wawancara",
        "related": [
          { "id": "test_wawancara", "number": 0 }
        ]
      }
    ],
    "status": "active",
    "protected": true,
  },
]
