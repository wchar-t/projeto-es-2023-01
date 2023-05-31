export default function ChangeEmail() {
    return (
        <main style={{ width: '100%', maxWidth: '1024px', padding: '15px', margin: '0 auto' }}>
            <div style={{ display: 'flex' }}>
                <h2>Alterar Email</h2>
                <form>
                    <label htmlFor='email'>Novo email
                        <input id='email' placeholder='Novo email' required></input>
                    </label>
                    <label htmlFor='password'>Senha antiga
                        <input id='password' placeholder='Senha' required type='password'></input>
                    </label>
                    <input type='submit' value='Confirmar' />
                </form>
            </div>
        </main>
    );
}