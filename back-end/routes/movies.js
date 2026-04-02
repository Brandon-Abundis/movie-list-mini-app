const db = require('../db/db')
const express = require('express');

const router = express(); // replacement for app i guees from last examples.

//________________________GET___________________________
router.get('/', async (req,res) => {
  try{
    const result = await db('movie_list').select('*');
    return res.status(200).json(result);
  }catch(err){
    res.status(500).send({message: err})
  }
});

router.get('/title/:title', async (req, res) => {
  try{
    const {title} = req.params;
    if (!title) {return res.status(404).send({message: `empty title`});}

    const result = await db('movie_list').select('*').whereILike('title', `%${title}%`);

    if(!result) {return res.status(404).send({message: `Cannot find a movie with the key word of ${title}`});}

    return res.status(200).json(result);
  } catch(err) {
    res.status(500).send({message: err.message});
  }
});

router.get('/id/:id', async (req, res) => {
  try{
    const {id} = req.params;
    if (!id) {return res.status(404).send({message: `empty id`});}

    const result = await db('movie_list').select('*').where({id}).first();

    if(!result) {return res.status(404).send({message: `Cannot find a movie by id`});}

    return res.status(200).json(result);
  } catch(err) {
    res.status(500).send({message: err.message});
  }
});

//________________________POST___________________________
router.post('/', async (req, res) => {
  try{
    const movieData = req.body;

    if(!movieData.title) {
      return res.status(400).json({message: 'Title is required'})
    }

    const [newMovie] = await db('movie_list').insert(movieData).returning('*');
    return res.status(201).json(newMovie);

  } catch(err) {
    res.result(500).send({message: err.message});
  }


})
//________________________DELETE___________________________
router.delete('/:id', async (req,res)=> {
  try{
    const {id} = req.params;

    if(!id){return res.status(404).send({message:'empty id'})}

    const deleted = await db('movie_list').where({id}).del();
    if (deleted === 0) {
      return res.status(404).send({ message: 'Movie not found' });
    }

    return res.status(200).json({ message: `Movie has been deleted.` });
  } catch(err) {
    res.status(500).send({message: err.message});
  }
});
//________________________PUT___________________________
/*const updateMovie = async (id, updatedData) => {
  const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  return await response.json();
};
*/
router.put('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const movieData = req.body;

    const [updatedMovie] = await db('movie_list').where({id}).update(movieData).returning('*');

    if(!updatedMovie) {return res.status(404).json({ message: 'Movie not found' });}
    return res.status(200).json(updatedMovie);
  }catch(err){
    res.status(500).json({message: err.message});
  }
})

module.exports = router;