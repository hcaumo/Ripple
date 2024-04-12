exports.handler = async (event) => {
    let response;
    try {
        if (!event.body) {
            throw new Error("No expression provided");
        }

        const expression = JSON.parse(event.body).expression;
        if (typeof expression !== 'string') {
            throw new Error("Expression must be a string");
        }

        let result = eval(expression);

        if (Math.abs(result) < 1.0) {
            // Convert to a string with a max of 10 decimal places
            let resultString = result.toFixed(10);

            // Check if the result has more than 10 leading zeros after the decimal
            if (resultString.split('.')[1].match(/^0{10,}/)) {
                result = 0;
            } else {
                // Remove trailing zeros
                result = parseFloat(resultString);
            }
        } else {
            // Round to 10 decimal places and remove unnecessary trailing zeroes
            result = parseFloat(result.toFixed(10));
        }

        console.log("result:", result)

        response = {
            statusCode: 200,
            body: JSON.stringify({ result }),
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        response = {
            statusCode: 400,
            body: JSON.stringify({ error: message }),
        };
    }

    return response;
};
