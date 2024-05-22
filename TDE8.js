// TDE 8 - BackEnd

const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient() //prisma

app.get('/tasks', async (req, res) => { 
    const tasks = await prisma.tasks.findMany() 
    res.json(tasks) 
}) //get que retorna todas as tarefas com async await

app.post('/tasks', async (req, res) => { 
    const task = req.body //dados da tarefa
    const newTask = await prisma.tasks.create({
        data: task
    }) //cria a tarefa
    res.status(201).json(newTask) //retorna a tarefa criada
}) //post que adiciona uma nova tarefa com async await

app.put('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id) //id da tarefa
    const task = req.body 
    const updatedTask = await prisma.tasks.update({
        where: { id },
        data: task
    }) //atualiza a tarefa
    if (!updatedTask) {
        return res.sendStatus(404)
    } //verifica se a tarefa foi atualizada
    res.json(updatedTask) //retorna a tarefa atualizada
}) //put que atualiza uma tarefa com async await

app.delete('/tasks/:id', async (req, res) => { 
    const id = parseInt(req.params.id) //id da tarefa 
    const deletedTask = await prisma.tasks.delete({
        where: { id }
    }) //deleta a tarefa
    if (!deletedTask) {
        return res.sendStatus(404)
    } //verifica se a tarefa foi excluída
    res.sendStatus(204) //retorna o status 204 se a tarefa foi excluída
}) //delete que remove uma tarefa com async await
