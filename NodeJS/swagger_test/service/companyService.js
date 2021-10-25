/**
 *  @swagger
 *  tags:
 *    name: Companies
 *    description: API to manage your Companies.
 */

/**
 *  @swagger
 *  paths:
 *   /company:
 *     get:
 *       summary: Lists all the companies
 *       tags: [Company]
 *       responses:
 *         "200":
 *           description: The list of Companies.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/company'
 *     post:
 *       summary: Creates a new Company
 *       tags: [Company]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/company'
 *       responses:
 *         "200":
 *           description: The created Company.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/company'
 */
