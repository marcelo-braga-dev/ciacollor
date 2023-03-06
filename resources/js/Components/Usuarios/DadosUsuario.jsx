export default function DadosUsuario({dados})
{
    return (
        <>
            {dados.codigo && <span className="d-block mb-2"><b>Código:</b> {dados.codigo}</span>}
            {dados.nome && <span className="d-block mb-2"><b>Nome:</b> {dados.nome}</span>}
            {dados.email && <span className="d-block mb-2"><b>E-mail:</b> {dados.email}</span>}
            {dados.superior_nome && <span className="d-block mb-2"><b>Gerente Regional:</b> {dados.superior_nome}</span>}
            {dados.meta_semestre_1 && <span className="d-block mb-2"><b>Meta 1° Semestre:</b> R$ {dados.meta_semestre_1}</span>}
            {dados.meta_semestre_2 && <span className="d-block mb-2"><b>Meta 2° Semestre:</b> R$ {dados.meta_semestre_2}</span>}
        </>
    )
}
