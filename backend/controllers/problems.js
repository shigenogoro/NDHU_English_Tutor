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

// Add a problem
const createNewProblem = async (req, res) => {
    const { 
        unit, 
        number, 
        wrong_answer, 
        correct_answer, 
        english_chunk1, 
        english_subject, 
        english_chunk2,
        english_verb, 
        english_chunk3,
        english_object, 
        english_chunk4,
        chinese_chunk1,
        chinese_subject, 
        chinese_chunk2,
        chinese_verb, 
        chinese_chunk3,
        chinese_object,
        chinese_chunk4
    } = req.body;

    try {
        const result = await pool.query(`INSERT INTO problems (
            unit, 
            number, 
            wrong_answer, 
            correct_answer, 
            english_chunk1, 
            english_subject, 
            english_chunk2,
            english_verb, 
            english_chunk3,
            english_object, 
            english_chunk4,
            chinese_chunk1,
            chinese_subject, 
            chinese_chunk2,
            chinese_verb, 
            chinese_chunk3,
            chinese_object,
            chinese_chunk4
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, [
            unit, 
            number, 
            wrong_answer, 
            correct_answer, 
            english_chunk1, 
            english_subject, 
            english_chunk2,
            english_verb, 
            english_chunk3,
            english_object, 
            english_chunk4,
            chinese_chunk1,
            chinese_subject, 
            chinese_chunk2,
            chinese_verb, 
            chinese_chunk3,
            chinese_object,
            chinese_chunk4
        ]);
        res.status(201).json({ message: 'Problem created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}

export default {
    getAllProblemsByUnit,
    getProblemById,
    getProblemByNumber,
    createNewProblem
};