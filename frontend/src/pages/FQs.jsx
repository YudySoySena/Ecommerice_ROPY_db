import React from 'react';
import './styles.css';

function FQs() {
  return (
    <div className="fqs-container">
      <h1>Todo lo que necesitas saber</h1>
      <p>¿Necesitas ayuda? El equipo de muebles ROPY ha recopilado las respuestas a algunas de las preguntas más frecuentes. Si no puedes encontrar la respuesta que estás buscando o necesitas más ayuda, no dudes en comunicarte en cualquier momento.</p>

      <div className="question">
        ¿TIENEN TARJETAS DE REGALO A LA VENTA O MEMBERSÍAS?
      </div>
      <div className="answer">
        ¡Sí! Ofrecemos tarjetas regalo que son el regalo perfecto para amigos y seres queridos que desean elegir sus propios muebles y decoración. Puedes adquirir tarjetas regalo en nuestra tienda física o en línea, y son válidas para cualquier producto en muebles ROPY.
        <br /><br />
        También contamos con nuestra membresía es una forma especial de agradecer a nuestros clientes leales. Al unirte a nuestra membresía, obtienes acceso exclusivo a descuentos adicionales, envío prioritario, acceso a eventos especiales y asesoramiento personalizado de diseño de interiores. Es nuestra manera de brindar un servicio excepcional a quienes eligen a muebles ROPY como su mejor opción.
      </div>

      <div className="separator"></div>

      <div className="question">
        ¿CUÁL ES NUESTRA POLÍTICA DE DEVOLUCIÓN EN MUEBLES ROPY?
      </div>
      <div className="answer">
        En muebles ROPY, nuestra prioridad es tu satisfacción. Si por alguna razón no estás completamente satisfecho con tu compra, ofrecemos una garantía de 10 años en nuestros productos, período de devolución de 7 días a partir de la fecha de entrega. Por favor, consulta con nuestros asesores para obtener información detallada sobre el proceso y los requisitos.
      </div>

      <div className="separator"></div>

      <div className="question">
        ¿QUÉ MEDIDAS TOMAN PARA GARANTIZAR LA CALIDAD DE SUS MUEBLES?
      </div>
      <div className="answer">
        La calidad es fundamental para nosotros. Trabajamos con artesanos expertos y utilizamos materiales de alta calidad en la fabricación de nuestros muebles. Cada pieza pasa por rigurosos controles de calidad antes de ser entregada a nuestros clientes. Estamos orgullosos de ofrecer muebles que resisten el paso del tiempo.
      </div>

      <div className="separator"></div>

      <div className="question">
        ¿OFRECEN OPCIONES DE FINANCIAMIENTO O PLANES DE PAGO A PLAZOS?
      </div>
      <div className="answer">
        Sí, ofrecemos opciones de financiamiento y planes de pago a plazos flexibles para que puedas obtener los muebles que deseas sin comprometer tu presupuesto, gracias a los convenios financieros con los que contamos. Por favor, comunícate con nuestro equipo de ventas o visita nuestra tienda para obtener más información sobre las opciones disponibles.
      </div>
    </div>
  );
}

export default FQs;