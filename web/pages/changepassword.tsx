import styles from '@/styles/ChangePassword.module.css';

export default function ChangePassword() {
    return (
        <main style={{ width: '100%', maxWidth: '1024px', padding: '15px', margin: '0 auto' }}>
            <div className={styles.formchange}>
                <h2>Alterar Senha</h2>
                <div>Crie uma nova senha</div>
                <form>
                    <label htmlFor='old-password'>Senha antiga
                        <input id='old-password' placeholder='Senha antiga' required type='password'></input>
                    </label>
                    <label htmlFor='new-password'>Nova senha
                        <input id='new-password' placeholder='Nova senha' required type='password'></input>
                    </label>
                    <label htmlFor='repeat-new-password'>Senha antiga
                        <input id='repeat-new-password' placeholder='Repita a nova senha' required type='password'></input>
                    </label>
                    <input type='submit' value='Confirmar' />
                </form>
            </div>
        </main>
    );
}