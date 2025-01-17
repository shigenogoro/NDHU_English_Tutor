import 'dotenv/config';
import { pool } from './database.js';
import problemsData from '../data/problems.js';

// Initialize database
const createUsersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS users;

        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          role BOOLEAN NOT NULL DEFAULT FALSE 
        );
    `;
  
  
    try {
      const res = await pool.query(createTableQuery);
      console.log('users table created successfully')
    } catch(err) {
      console.error('error creating users table', err)
    }
}

const createProblemsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS problems;

        CREATE TABLE IF NOT EXISTS problems (
          id SERIAL PRIMARY KEY,
          unit INT NOT NULL,
          number INT NOT NULL,
          correct_answer VARCHAR(255) NOT NULL,
          wrong_answer VARCHAR(255) NOT NULL,
          english_chunk1 TEXT,
          english_subject TEXT,
          english_chunk2 TEXT,
          english_verb TEXT NOT NULL,
          english_chunk3 TEXT,
          english_object TEXT,
          chinese_chunk1 TEXT,
          chinese_subject TEXT,
          chinese_chunk2 TEXT,
          chinese_verb TEXT NOT NULL,
          chinese_chunk3 TEXT,
          chinese_object TEXT,
          chinese_chunk4 TEXT
        );
    `;
  
  
    try {
      const res = await pool.query(createTableQuery);
      console.log('problems table created successfully')
    } catch(err) {
      console.error('error creating problems table', err)
    }
}

const seedProblemsTable = async () => {
    await createProblemsTable();

    // Traverse the Problems Data
    problemsData.forEach((problem) => {
      const insertProblemsQuery = `
          INSERT INTO problems (
            unit, number, correct_answer, wrong_answer,
            english_chunk1, english_subject, english_chunk2,
            english_verb, english_chunk3, english_object,
            chinese_chunk1, chinese_subject, chinese_chunk2,
            chinese_verb, chinese_chunk3, chinese_object, chinese_chunk4
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
          );
      `;

      const values = [
          problem.unit,
          problem.number,
          problem['correct-answer'],
          problem['wrong-answer'],
          problem['english-chunk1'] || null,
          problem['english-subject'] || null,
          problem['english-chunk2'] || null,
          problem['english-verb'] || null,
          problem['english-chunk3'] || null,
          problem['english-object'] || null,
          problem['chinese-chunk1'] || null,
          problem['chinese-subject'] || null,
          problem['chinese-chunk2'] || null,
          problem['chinese-verb'] || null,
          problem['chinese-chunk3'] || null,
          problem['chinese-object'] || null,
          problem['chinese-chunk4'] || null
      ];

      pool.query(insertProblemsQuery, values, (err, res) => {
          if (err) {
              console.error('error seeding problems table', err)
          } else {
              console.log(`✅ Problem ${problem.number} added successfully`)
          }
      });
    });
}

// Call the function to create the table and seed the data
createUsersTable();
seedProblemsTable();