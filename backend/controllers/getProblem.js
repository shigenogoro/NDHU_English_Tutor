import { pool } from '../config/database.js';

// Get all problems
const getAllProblemsByUnit = async (req, res) => {
    const { unit } = req.params;
    
    try {
        const result = await pool.query('SELECT * FROM problems WHERE unit = $1', [unit]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};


// Get a problem by id
const getProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM problems WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

// Get a problem by number
const getProblemByNumber = async (req, res) => {
    const { number } = req.params;

    try {
        const result = await pool.query('SELECT * FROM problems WHERE number = $1', [number]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

export default {
    getAllProblemsByUnit,
    getProblemById,
    getProblemByNumber
};