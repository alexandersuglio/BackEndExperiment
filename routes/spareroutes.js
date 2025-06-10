// there are 'spare' routes that DO work, just dont really have a use for them

router.get('/dogs', async (req, res) => {

    const { id } = req.query;

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


router.get('/dogs/:name', async (req, res) => {

    //const { name } = req.params;

    try {
        const response = await fetch(`${base}?name=eq.${name}`, {
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

    const { name } = req.query;

    try {
        const response = await fetch(`${base}?name=eq.${name}`, {
            method: 'GET',
            headers: {
                apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            }
        });

        console.log(req.query);

        const data = await response.json();
        res.json(data[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});


router.get('/dogs', async (req, res) => {

    try {

        const response = await fetch(base, {
            headers: {
                apikey: SUPABASE_KEY,
                authorization: `Bearer ${SUPABASE_KEY}`
            }
        });

        if (!response.ok) throw new Error(await response.text());

        //res.json('it works');
        res.json(await response.json());

    } catch (err) {

        res.status(500).json({ error: err.message });
    }

});