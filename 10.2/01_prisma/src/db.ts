import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function insertUser(
    username : string,
    password : string,
    firstName : string,
    lastName  : string
) {
    try {
        const insertedUser = await prisma.user.create({
            data : {
                username,
                password,
                firstName,
                lastName
            }
        })
        console.log(insertedUser);
    } catch (error : any) {
        console.log(error.message);
        
    }
}

//insertUser('pooja', 'p' , 'pooja' , 'mudhol')

interface updatePara {
    firstName : string,
    lastName : string
}

async function updateUser(username : string, { firstName, lastName }: updatePara){
    const updatedUser = await prisma.user.update({
        where : {
            username
        },
        data : {
            firstName,
            lastName
        }
    })

    console.log(updatedUser);
}

//updateUser('pooja' , {firstName : 'POOJA' , lastName: 'MUDHOL'})

async function userDetails(username : string){
    const details = await prisma.user.findFirst({
        where : {
            username
        }
    })
    console.log(details);
}

//userDetails('pooja')

async function createTodo(userId: number, title: string, description: string) {
    const todo = await prisma.todos.create({
        data : {
            user_Id : userId,
            title,
            description
        }
    })

    console.log(todo);
}

//createTodo(1 , 'play' , 'play sport')

async function getTodos(userId: number){
    const todos = await prisma.todos.findMany({
        where : {user_Id: userId}
    })

    console.log(todos);

}

//getTodos(1)

async function getTodosAndUserDetails(userId: number){
    const userDetailsWithTods = await prisma.todos.findMany({
        where : {
            user_Id : userId
        },
        include : {
            user : true
        }
    })

    console.log(userDetailsWithTods);
}

getTodosAndUserDetails(1)