const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require("../database/index")
const postsController = {

    getAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from users")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const [rows, fields] = await pool.query("select * from users where email = ?", [email]);

            if (rows.length === 0) {
                res.status(401).json({ error: 'No data found' });
                return;
            }
            
            const user = rows[0];
            //OTHER SOLUTION (ERROR)
            //const passwordMatch = await bcrypt.compare(password, user.password);
            const passwordMatch = password === user.password;
            //TEST
            //console.log(password)
            //console.log(user.password)
            //console.log(passwordMatch)
            if (!passwordMatch) {
                res.status(401).json({ error: 'Invalid password' });
                return;
            }
            if (passwordMatch)
                {
                res.json({ success: `Welcome ${user.username}` });}

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }



    

}

module.exports = postsController