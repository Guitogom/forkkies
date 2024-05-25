/**
 * @swagger
 * tags:
 *   name: Documentation
 *   description: Documentation related endpoints
 */

/**
* @swagger
* /docs/info:
*   get:
*     summary: Get documentation information
*     tags: [Documentation]
*     responses:
*       200:
*         description: Documentation information
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: 'This is documentation information'
*/

/**
* @swagger
* /docs/contact:
*   get:
*     summary: Get contact information
*     tags: [Documentation]
*     responses:
*       200:
*         description: Contact information
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 email:
*                   type: string
*                   example: uwu'
*                 phone:
*                   type: string
*                   example: '+1234567890'
*/

export {};
