import Link from "next/link";
import React, { useState, ChangeEvent } from 'react';

const notificateComp: React.FC = () => {
    const [usuario, usuarioid] = useState<string>('');

    const input_change = (event: ChangeEvent<HTMLInputElement>) => {
        usuarioid(event.target.value);
    };

    return (
        <div>
            <input type="text"
                id="usuario"
                placeholder="Ex.: @user.tx2"
                style={{
                    height: '25px',
                    marginRight: '10px',
                    marginTop: '10px',
                    padding: '15px 10px',
                    color: '#ccc',
                    borderRadius: '3px'
                }}
                value={usuario}
                onChange={input_change} />
            <button style={{
                borderRadius: '4px',
                outline: 'None',
                cursor: 'pointer',
                padding: '8px 10px',
                backgroundColor: '#DFE9EC',
                color: '#fff'
            }}>
                Ok!
            </button>
        </div>
    );
};

export default notificateComp;