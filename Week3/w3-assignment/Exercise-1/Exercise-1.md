Exercise 1: SQL Normalization

1. Columns Violating 1NF:
.Comma-separated values in columns like `food_code` and `food_description`.

2. Entities to Extract:
.Dinner entity, Venue entity, Food entity.

3. 3NF Compliant Tables:
. `Members` (member_id, member_name, member_address)
. `Dinners` (dinner_id, dinner_date)
. `Venues` (venue_code, venue_description)
. `Foods` (food_code, food_description)
. `Members_Dinners` (member_id, dinner_id)
. `Dinners_Venues` (dinner_id, venue_code)
.`Dinners_Foods` (dinner_id, food_code)

//diagram
+----------------+      +------------------+      +----------------+      +----------------+      +---------------+
         |   Members      |      |   Dinners        |      |   Venues       |      |   Foods        |      |   Members     |
         +----------------+      +------------------+      +----------------+      +----------------+      |   Dinners     |
         | member_id (PK) |      | dinner_id (PK)   |      | venue_code (PK)|      | food_code (PK) |      |   dinner_id   |
         | member_name    |      | dinner_date      |      | venue_desc     |      | food_desc      |      +---------------+
         | member_address |      +------------------+      +----------------+      +----------------+
         +----------------+             |                           |                           |               +------------------+
                                         |                           |                           |               |  Dinners         |
                                         |                           |                           |               +------------------+
                                         |                           |                           |               |  dinner_id (PK)  |
                                         |                           |                           +---------------+  venue_code (FK) |
                                         |                           +---------------------------|               +------------------+
                                         |                           |                           |
                                         |                           |                           |
                                         |                           |                           |
                                         |                           |                           |
                                         |                           |                           |
                              +--------------------------+  +-------------------------+   +-------------------+
                              | Members_Dinners         |  | Dinners_Venues         |   | Dinners_Foods      |
                              +--------------------------+  +-------------------------+   +-------------------+
                              | member_id (FK) (PK)     |  | dinner_id (FK) (PK)    |   | dinner_id (FK) (PK)|
                              | dinner_id (FK) (PK)     |  | venue_code (FK) (PK)   |   | food_code (FK) (PK)|
                              +--------------------------+  +-------------------------+   +-------------------+

