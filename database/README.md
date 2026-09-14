# Database Configuration

## Schema

Project LOOP uses PostgreSQL with the following main tables:

### Core Tables

#### organizations
- Multi-tenant support
- Each organization has isolated data
- Fields: id, name, slug, logo_url, is_active

#### users
- User accounts with role-based access
- Roles: admin, manager, analyst, agent, viewer
- Fields: id, organization_id, email, password, first_name, last_name, role

#### feedback
- Customer feedback entries
- Sentiment analysis results
- Status tracking
- Fields: id, organization_id, content, source, sentiment, confidence, status

#### teams
- Team management
- Organize users into teams
- Fields: id, organization_id, name, description

#### themes
- Extracted themes from feedback
- Keyword tracking
- Fields: id, organization_id, theme, keywords, frequency

#### reports
- Scheduled and generated reports
- Custom filters and configurations
- Fields: id, organization_id, name, type, filters, schedule

#### audit_logs
- Track all changes for compliance
- User actions and resource changes
- Fields: id, organization_id, user_id, action, resource_type, changes

## Setup

```bash
# Create database
creatdb project_loop

# Run schema
psql project_loop < database/schema.sql

# Seed sample data
psql project_loop < database/seeds.sql
```

## Migrations

Use Knex.js for migrations:

```bash
# Create migration
knex migrate:make migration_name

# Run migrations
knex migrate:latest

# Rollback
knex migrate:rollback
```
