
module.exports = [
  {
    "id": "role_administrator",
    "name": "administrator",
    "description": "Administrator Role",
    "status": "active",
    "permissions": [
      "*"
    ]
  },
  {
    "id": "role_editor",
    "name": "editor",
    "description": "Editor Role",
    "status": "active",
    "permissions": [
      "/main/*"
    ]
  },
  {
    "id": "role_member",
    "name": "member",
    "description": "Member Role",
    "status": "active",
    "permissions": [
      "/main/profile"
    ]
  }
]
