const express =require('express');
const app =express();
const cors=require('cors');
const pool = require('./db');
const PORT=process.env.PORT || 3000;


//middleware
app.use(cors());
app.use(express.json());

//Route

//Add todos
app.post('/todos',async(req,res)=>{
    try {
        const {description} = req.body;
        const addTodos=await pool.query('INSERT INTO todos(description) VALUES($1) RETURNING *',[description]);
        res.json(addTodos.rows[0]);
    } catch (error) {
        console.log(error);
    }
    
});
//get All todos
app.get('/todos',async(req,res)=>{
    try {
        const getTodos=await pool.query('SELECT * FROM todos');
        res.json(getTodos.rows);
    } catch (error) {
        console.log(error);
    }
});

//get specific todos
app.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const getSpeTodo=await pool.query('SELECT * FROM todos WHERE todo_id=$1',[id]);
        res.json(getSpeTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});
//update todos
app.put('/todos/:id',async(req,res)=>{
    try {
        
        const {id}= req.params;
        const {description}=req.body
        const updateTodo=await pool.query('UPDATE todos SET description=$1 WHERE todo_id=$2',[description,id]);
        res.json(updateTodo);
    } catch (error) {
        console.log(error)
    }
});

//delete todos
app.delete('/todos/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo=await pool.query('DELETE FROM todos WHERE todo_id=$1',[id]);
        res.json('deleted');
    } catch (error) {
        console.log(error);
    }
});


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});