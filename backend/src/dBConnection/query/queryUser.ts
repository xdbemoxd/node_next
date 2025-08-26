import pool from "../dBconection";

export async function typeUrgency() {
    const result = await pool.query('SELECT * FROM urgency');
    return result.rows;
}