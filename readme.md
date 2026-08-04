# CRM Platform

## Database

### Start / Stop

```bash
brew services start postgresql@16   # Start (also runs on login)
brew services stop postgresql@16    # Stop
brew services restart postgresql@16 # Restart
```

### Connect via psql

```bash
psql -U postgres -d crm_users_db    # Connect to the users DB
psql postgres                        # Connect as your Mac user (superuser)
```

### Useful psql listing commands

| Command | What it shows |
|---|---|
| `\l` | List all databases |
| `\dt` | List all tables in current DB |
| `\d table_name` | Describe a table (columns, types, constraints) |
| `\du` | List all users/roles |
| `\dn` | List all schemas |
| `\q` | Quit psql |

### Drizzle scripts (run from `services/users/`)

```bash
bun run db:generate   # Generate migration files from schema changes
bun run db:migrate    # Apply pending migrations to the DB
bun run db:push       # Push schema directly (skip migration files)
bun run db:studio     # Open Drizzle Studio (visual DB browser)
bun run db:drop       # Drop a migration
```
