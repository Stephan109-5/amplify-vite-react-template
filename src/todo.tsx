import { useEffect, useState } from "react";
import { Authenticator, Flex, Heading, Menu, MenuItem } from '@aws-amplify/ui-react'
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router-dom';

const client = generateClient<Schema>();

export default function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }, []);

    function createTodo() {
        client.models.Todo.create({ content: window.prompt("Todo content") });
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id })
    }

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <Flex direction={'row'} alignItems="center" justifyContent="space-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                        <Heading level={5}>{user?.signInDetails?.loginId}'s todos</Heading>
                        <Menu menuAlign="end">
                            <MenuItem onClick={() => navigate('/gallery')}>
                                Gallery
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/translate')}>
                                Translate
                            </MenuItem>
                        </Menu>
                    </Flex>
                    <button onClick={createTodo}>+ new</button>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id} onClick={() => deleteTodo(todo.id)}>{todo.content}</li>
                        ))}
                    </ul>
                    <div>
                        🥳 App successfully hosted. Try creating a new todo.
                        <br />
                        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                            Review next step of this tutorial.
                        </a>
                    </div>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    )
}