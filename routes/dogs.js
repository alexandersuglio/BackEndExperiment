
// this is for the dummy internal 'static' json dog to add

//const jsonSnippet = require('../../StaticDBExperiment/sample.json');

//const jsonSnippet = {
//   name: "Jackson",
//   breed: "German Shepherd",
//   color: "Black and Tan"
// };

const express = require('express');

const router = express.Router();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

const base = `${SUPABASE_URL}/rest/v1/sql_dogs_dupe`;


router.get('/dogs/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const response = await fetch(`${base}?id=eq.${id}`, {
            method: 'GET',
            headers: {
                apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            }
        });

        const data = await response.json();
        res.json(data[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.get('/dogs', async (req, res) => {
    
    const { id, name, breed, color } = req.query;

    const filters = [];

    if (id) filters.push(`id=eq.${id}`);
    if (name) filters.push(`name=eq.${name}`);
    if (breed) filters.push(`breed=eq.${breed}`);
    if (color) filters.push(`color=eq.${color}`);

    let baseCopy = base

    if (filters.length > 0)
    {
    	baseCopy += `?${filters.join('&')}`;
    } 

    try {
        const response = await fetch(baseCopy, {
            method: 'GET',
            headers: {
                apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`
            }

        });

        const data = await response.json();

        if (id && !data.length)

            return res.status(404).json({ error: 'Dog not found' });

        res.json(id ? data[0] : data);

    } catch (err) {

        res.status(500).json({ error: 'Internal Server Error', detail: err.message });

    }

});


router.post('/dogs', async (req, res) => {

	const { id, name, breed, color } = req.body;

	// const dog = req.body;

    try {
        const response = await fetch(base, {
            method: 'POST',
            headers: {
                apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },

            // this is where the req.body would go
            body: JSON.stringify({ id, name, breed, color })
            
            //body: JSON.stringify(dog)
        });

        // console.log('this is THE response', response);
        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({ error: err.message });
    
    }

});


router.put('/dogs/:id', async (req, res) => {

	const {id} = req.params;
	const updateData = req.body

	try {
		const response = await fetch(`${base}?id=eq.${id}`, {
			method: 'PATCH',
			headers: {
				apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
			}, 
			body: JSON.stringify(updateData)
		});

		const data = await response.json();

		res.json(data);

	} catch (err) {

    	res.status(500).json({ error: err.message });

	}

});


router.delete('/dogs/:id', async (req, res) => {

	const { id } = req.params;

	try {

		const response = await fetch(`${base}?id=eq.${id}`, {
			method: 'DELETE',
			headers: {
				apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`,
                Prefer: 'return=representation'
			},

		});

		console.log(`Deleting: ${base}?id=eq.${id}`);

		if (response.ok)
		{

			const data = await response.json();
			//console.log(data, data[0])
			res.json({message: 'Dog Deleted Successfully', data});


		} else {

			const error = await response.text();

			res.status(response.status.json({error}));

		}

	} catch (err) {

		res.status(500).json({ error: err.message});

	}

});

router.get('/', async (req, res) => {

    res.json("base URL Here!");
    //res.json(jsonSnippet);

});


module.exports = router;







