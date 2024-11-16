const { generateQuestions, getRandomQuestionsDB } = require('../services/question.services');

/**
 * Get random questions from the service.
 *
 * Retrieves random questions filtered by difficulty (if specified) and limited by the specified amount.
 * Defaults to 10 questions of any difficulty if no parameters are provided.
 *
 * @async
 * @function getRandomQuestions
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} [req.query.amount] - The number of questions requested. Defaults to 10.
 * @param {string} [req.query.difficulty] - The difficulty level to filter questions. Optional.
 * @param {Object} res - Express response object used to send back the response.
 * @returns {Promise<void>} Sends a JSON response with the requested random questions or an error message.
 *
 * @throws {Error} If an unexpected error occurs, a 500 status code is returned with the error message.
 */
const getRandomQuestions = async (req, res) => {
    try {
        // Extract query parameters
        let { amount, difficulty } = req.query;

        // Validate and parse the 'amount' parameter
        amount = parseInt(amount, 10);
        if (isNaN(amount) || amount < 1) {
            amount = 10; // Default to 10 if invalid or not provided
        } else if (amount > 30) {
            amount = 30; // Cap at 30
        }

        // Construct filter for difficulty if provided
        const filter = {};
        if (difficulty) {
            filter.difficulty = difficulty; // Add difficulty to the filter
        }

        // Call the service function with the optional difficulty filter
        const randomQuestions = await getRandomQuestionsDB(amount, filter);

        // Send the response with the retrieved questions
        res.status(200).json({
            message: "Random questions delivered successfully",
            results: randomQuestions,
        });
    } catch (error) {
        console.error("Error fetching random questions:", error.message);
        res.status(500).json({
            message: "Error fetching random questions",
        });
    }
};

// Controller function to handle requests for generating AI-based questions
const getAiQuestions = async (req, res) => {
    const topic = req.query.topic || "Frontend and Backend programming";
    const amount = Math.min(Math.max(parseInt(req.query.amount) || 1, 1), 10);
    try {
        const questions = await generateQuestions(topic, amount);
        return res.status(200).json({
            message: "Random questions delivered successfully.",
            results: questions,
        });
    } catch (error) {
        console.error(
            "Error generating the questions:",
            error.response ? error.response.data : error.message
        );
        return res.status(400).json({
            message: error.message || "An error occurred while generating the questions.",
        });
    }
};

module.exports = {
    getRandomQuestions,
    getAiQuestions,
};
