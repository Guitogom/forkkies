import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export function ClientStepHandler({ categories }) {
    const { tag, categoryId, productId } = useParams()
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    const product = category ? category.products.find(pro => pro.id === parseInt(productId)) : null
    const steps = product ? product.steps : []

    const [innerCart, setInnerCart] = useState({
        category: category ? category.id : '',
        product: product ? product.id : '',
        name: product ? product.name : '',
        img: product ? product.img : '',
        quantity: 1,
        individualPrice: product ? product.price : 0,
        totalPrice: product ? product.price : 0
    })

    return (
        <section>
            {steps.map((step, index) => (
                <StepDisplay key={step.id} type={step.type} step={step} />
            ))}
        </section>
    )
}

function StepDisplay({ type, step }) {
    // Implementa la lógica para renderizar cada tipo de step según sea necesario
    return (
        <div>
            <h3>{step.title}</h3>
            {/* Renderiza las opciones especiales aquí, si existen */}
            {step.specials && step.specials.map(special => (
                <div key={special.id}>
                    <p>{special.name}</p>
                    <p>Precio adicional: {special.price_changer}</p>
                </div>
            ))}
        </div>
    )
}
