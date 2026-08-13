import React, { useEffect, useState } from 'react';
import './App.css';

const img = (file) => `${process.env.PUBLIC_URL}/img/${file}`;
const apiUrl = (path) => `https://sincere-exploration-production.up.railway.app/api${path}`;
const categoryIcons = { Burgers: '&#127828;', Salchipapas: '&#127839;', Ensaladas: '&#129367;', Chaufas: '&#127834;', Bebidas: '&#129380;' };
const reservationTimes = Array.from({ length: 14 }, (_, hour) => `${String(hour + 10).padStart(2, '0')}:00`);
const deliveryStatuses = ['Solicitado', 'En camino', 'Entregado'];
const normalizePhone = (phone) => String(phone || '').replace(/\D/g, '');
const tableBranch = (table) => table.sede || table.nombre_sede || table.local || table.branch || '';

async function apiRequest(path, options = {}) {
  const { headers, ...requestOptions } = options;
  const response = await fetch(apiUrl(path), {
    ...requestOptions,
    headers: { Accept: 'application/json', ...headers }
  });
  if (!response.ok) throw new Error('No se pudo completar la operacion.');
  return response.status === 204 ? null : response.json();
}

const menuData = [
  {
    title: 'Burgers',
    icon: '&#127828;',
    items: [
      ['cheese_burger', 'Carne artesanal, queso cheddar, lechuga, tomate y salsa de la casa.', 'S/ 19.90', img('cheese_burger.jpeg')],
      ['Bacon Burger', 'Hamburguesa con tocino crocante, doble queso y papas al hilo.', 'S/ 19.90', img('hambuguersa_baccon.jpeg')],
      ['Big Grill Burger', 'Doble carne parrillera, cebolla caramelizada y crema especial.', 'S/ 18.90', img('hambuguersa_grill.jpeg')]
    ]
  },
  {
    title: 'Salchipapas',
    icon: '&#127839;',
    items: [
      ['Clasico', 'Papas doradas, hot dog, mayonesa, ketchup y mostaza.', 'S/ 15.90', img('salchipapa_clasico.jpeg')],
      ['Salchipobre', 'Papas, hot dog, huevo frito, platano y salsa criolla.', 'S/ 17.90', img('salchipapa_alopobre.jpeg')],
      ['Salchibrasa', 'Papas crocantes, pollo brasa deshilachado y cremas.', 'S/ 19.90', img('salchipapa_broaster.jpeg')]
    ]
  },
  {
    title: 'Ensaladas',
    icon: '&#129367;',
    items: [
      ['Ensalada Cesar', 'Pollo grillado, crutones, queso parmesano y salsa cesar.', 'S/ 19.90', img('ensalada_cesar.jpeg')],
      ['Ensalada Caprese', 'Tomate, queso fresco, albahaca y aceite de oliva.', 'S/ 19.90', img('ensalada_capresse.jpeg')],
      ['Ensalada Griega', 'Pepino, aceitunas, tomate, queso y vegetales frescos.', 'S/ 19.90', img('ensalada_griega.jpeg')]
    ]
  },
  {
    title: 'Chaufas',
    icon: '&#127834;',
    items: [
      ['Chaufa Clasico', 'Arroz salteado al wok con pollo, huevo y cebolla china.', 'S/ 14.90', img('chaufa_clasico.jpeg')],
      ['Chaufa de Carne', 'Carne salteada, sillao, kion y verduras crocantes.', 'S/ 16.90', img('chaufa_carne.jpeg')],
      ['Chaufa Amazonico', 'Arroz, cecina, platano frito y toque oriental.', 'S/ 18.90', img('chaufa_amazonico.jpeg')]
    ]
  },
  {
    title: 'Bebidas',
    icon: '&#129380;',
    items: [
      ['Gaseosa 600 ml', 'Inca Kola, Coca-Cola o Sprite helada.', 'S/ 5.00', img('gaseosa.jpeg')],
      ['Agua 750 ml', 'Agua mineral sin gas o con gas.', 'S/ 3.00', img('agua.jpeg')],
      ['Bebida de la casa 1 L', 'Maracuya, chicha morada o limonada frozen.', 'S/ 8.90', img('bebidas_casa.jpeg')]
    ]
  }
];

// Productos que siempre deben formar parte de la carta.  Se restauran si la
// base de datos queda vacia y no se pueden eliminar desde el panel.
const protectedMenuItems = menuData.flatMap((category) => category.items.map(([name, description, price, image]) => ({
  id: `base-${category.title}-${name}`,
  category: category.title,
  name,
  description,
  price: Number(price.replace('S/ ', '')),
  image: image.split('/').pop(),
  available: true,
  protected: true
})));

const productKey = (item) => `${item.category}|${item.name}`.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');
const protectedMenuItemFor = (item) => protectedMenuItems.find((baseItem) => productKey(baseItem) === productKey(item));
const normalizeMenuItem = (item) => {
  const baseItem = protectedMenuItemFor(item);
  return baseItem ? { ...item, image: baseItem.image, protected: true } : { ...item, protected: false };
};
const removeDuplicateMenuItems = (items) => Array.from(items.reduce((uniqueItems, item) => {
  const key = productKey(item);
  if (!uniqueItems.has(key)) uniqueItems.set(key, item);
  return uniqueItems;
}, new Map()).values());

const locations = [
  ['Callao', 'Av. La Marina con Av. Universitaria, frente a Plaza San Miguel.'],
  ['San Martin de Porres', 'Av. Tomas Valle con Av. Universitaria, al costado de Incafarma.'],
  ['Lima', 'Av. 28 de Julio N 625, junto al Ovalo Jorge Chavez.'],
  ['Santiago de Surco', 'Av. Caminos del Inca 1163.'],
  ['San Isidro', 'Av. Javier Prado Este, frente al hotel Santa Cruz.'],
  ['La Molina', 'Av. Raul Ferrero, centro de Plaza Center, segundo piso.']
];

const inventory = [
  ['Pan hamburguesa', 150, null, 'unidades'],
  ['Papas fritas', 85, null, 'porciones'],
  ['Queso cheddar', 220, null, 'laminas'],
  ['Gaseosa Inca Kola 1L', 65, null, 'botellas'],
  ['Arroz', 48, null, 'kg']
];

const initialBookings = [
  ['Carlos Perez', '4 personas', 'Hoy 7:30 PM', 'Pendiente'],
  ['Maria Lopez', '2 personas', 'Hoy 8:00 PM', 'Confirmada'],
  ['Juan Diaz', '3 personas', 'Manana 7:00 PM', 'Pendiente'],
  ['Ana Torres', '5 personas', 'Manana 8:20 PM', 'Confirmada']
];

const deliveries = [
  ['Carlos Perez', 'Pedido #158', 'San Miguel', 'Solicitado', null],
  ['Maria Lopez', 'Pedido #159', 'Lince', 'En camino', null],
  ['Luis Ramos', 'Pedido #160', 'Surco', 'Solicitado', null],
  ['Ana Torres', 'Pedido #161', 'San Borja', 'Entregado', null]
];

function Entity({ code }) {
  return <span dangerouslySetInnerHTML={{ __html: code }} />;
}

function Header({ activeView, onViewChange }) {
  const links = [
    ['inicio', 'Inicio'],
    ['carta', 'Carta'],
    ['locales', 'Locales'],
    ['reserva', 'Reservacion'],
    ['admin', 'Admin']
  ];

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onViewChange('inicio')}>
        <img className="brand-logo" src={img('LOGO.png')} alt="FAST-FOOD PERU" />
        <span>FAST-FOOD PERU</span>
      </button>

      <nav className="main-nav" aria-label="Navegacion principal">
        {links.map(([id, label]) => (
          <button
            className={activeView === id ? 'active' : ''}
            key={id}
            type="button"
            onClick={() => onViewChange(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Home({ onViewChange }) {
  return (
    <section className="view active">
      <div className="page-shell home-layout">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">36 minutos promedio</p>
            <h1>Servicio directo a tu domicilio</h1>
            <p>Ordena tus combos favoritos, revisa ofertas del dia y reserva una mesa en los locales mas cercanos.</p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={() => onViewChange('carta')}>Ver carta</button>
              <button className="secondary-action" type="button" onClick={() => onViewChange('reserva')}>Reservar</button>
            </div>
          </div>

          <div className="delivery-scene" aria-label="Pedido por delivery">
            <img className="delivery-image" src={img('delivery.png')} alt="Pedido por delivery" />
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Ofertas del dia</p>
            <h2>Combos pensados para compartir</h2>
          </div>
          <div className="promo-grid">
            <article className="promo-card promo-red">
              <span>2x</span>
              <h3>Super Combo Fast</h3>
              <p> 2 Salchifood Grandes.</p>
              <p> 1 Big Grill.</p>
              <p> 1 Ensalada Mediana.</p>
              <strong>S/ 30.00</strong>
            </article>
            <article className="promo-card promo-yellow">
              <h3>Fest Big 4L</h3>
              <p>1 Big-Grill de 1/4 de Libra.</p>
              <p>1 Porcion de papas Medianas.</p>
              <strong>S/ 8.90</strong>
            </article>
            <article className="promo-card promo-dark">
              <span>2</span>
              <h3>Combo "Facilon"</h3>
              <p>1 Burger-cheesse.</p>
              <p>1 Burger-Bacon.</p>
              <p>1 Gaseosa Mediana (300 Mlt.)</p>
              <strong>S/ 18.00</strong>
            </article>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Descarga nuestra app</p>
            <h2>Pedidos mas rapidos, ofertas y seguimiento</h2>
          </div>
          <div className="app-band">
            <ul>
              <li><h4>Al alcance de tu mano para ordenar desde cualquier lugar.</h4></li>
              <li><h4>Promociones locales para ahorrar en tus pedidos.</h4></li>
              <li><h4>Estado de delivery y reservas en un solo lugar.</h4></li>
            </ul>
            <div className="app-preview">
              <a className="playstore-button" href="https://play.google.com/store/apps/details?id=lac.huahlabs.com.llamafooddelivery&hl=es" target="_blank" rel="noopener noreferrer" aria-label="Abrir app en Play Store">
                <img className="playstore-image" src={img('playstore.jpeg')} alt="Disponible en Play Store" />
              </a>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Recomendados</p>
            <h2>Opiniones de usuarios</h2>
          </div>
          <div className="testimonial-grid">
            <article><strong>Andrea R.</strong><p>La reserva fue rapida y el pedido llego caliente.</p></article>
            <article><strong>Hector M.</strong><p>La carta se entiende facil y los combos estan claros.</p></article>
            <article><strong>Valeria T.</strong><p>Me gusto ubicar el local mas cercano desde la web.</p></article>
          </div>
        </section>
      </div>
    </section>
  );
}

function Menu({ menuItems }) {
  const categories = menuItems.length
    ? Object.values(menuItems.reduce((grouped, item) => {
      const category = grouped[item.category] || { title: item.category, icon: categoryIcons[item.category] || '&#127860;', items: [] };
      category.items.push([item.name, item.description, `S/ ${Number(item.price).toFixed(2)}`, img(item.image), item.id]);
      grouped[item.category] = category;
      return grouped;
    }, {}))
    : menuData;

  return (
    <section className="view active">
      <div className="page-shell">
        <div className="section-heading page-title">
          <p className="eyebrow">Carta</p>
          <h1>Menu principal</h1>
        </div>
        <div className="menu-stack">
          {categories.map((category) => (
            <section className="menu-category" key={category.title}>
              <h2>{category.title}: <Entity code={category.icon} /></h2>
              <div className="menu-grid">
                {category.items.map(([name, description, price, image, id]) => (
                  <article className="menu-card" key={id || name}>
                    <img className="food-art" src={image} alt={name} />
                    <div className="menu-info">
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <div className="price-row">
                        <strong>{price}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations({ onViewChange }) {
  return (
    <section className="view active">
      <div className="page-shell">
        <div className="section-heading page-title">
          <p className="eyebrow">Locales</p>
          <h1>Ubicanos en tu zona</h1>
          <span>Aqui encontraras nuestros locales disponibles para delivery o recojo.</span>
        </div>
        <div className="locations-list">
          {locations.map(([district, address]) => (
            <article className="location-card" key={district}>
              <div className="location-info">
                <p className="eyebrow">{district}</p>
                <h2>{address}</h2>
                <p>Atencion de lunes a domingo. Delivery, recojo en tienda y reservas disponibles.</p>
                <button className="mini-action" type="button" onClick={() => onViewChange('reserva', district)}>Reservar</button>
              </div>
              <div className="map-preview" aria-label={`Mapa referencial de ${district}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservation({ onAddBooking, initialSede = '' }) {
  const [message, setMessage] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState('');
  const [selectedSede, setSelectedSede] = useState(initialSede);
 const availableTables = selectedSede ? tables : [];
  const selectedTable = availableTables.find((table) => String(table.idmesa) === selectedTableId);

  useEffect(() => {
    fetch(apiUrl('/mesas'))
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar las mesas.');
        return response.json();
      })
      .then(setTables)
      .catch(() => setTables([]));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.guestName.value.trim() || 'Cliente';
    const phone = form.elements.phone.value.trim();
    const date = form.elements.visitDate.value;
    const time = form.elements.visitTime.value;
    const guests = form.elements.guests.value;
    try {
      await onAddBooking({
        mesa_id: Number(form.elements.mesaId.value),
        sede: selectedSede,
        guest_name: name,
        phone,
        visit_date: date,
        visit_time: time,
        guests: Number(guests)
      });
      setMessage(`${name}, tu reservacion fue registrada correctamente.`);
      form.reset();
      setSelectedTableId('');
    } catch (error) {
      setMessage(error.message || 'No se pudo registrar la reservacion.');
    }
  }

  return (
    <section className="view active">
      <div className="page-shell reservation-layout">
        <section className="reservation-copy">
          <p className="eyebrow">Reservacion</p>
          <h1>Realiza tu reserva y evita las colas</h1>
          <p>Separa tu mesa, elige la hora de llegada y comparte una rica comida acompanada de tus favoritos.</p>
          <div className="reservation-icon"><Entity code="&#128450;" /></div>
        </section>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <h2>Detalles de la reserva.</h2>
          <label>Nombre completo<input name="guestName" type="text" placeholder="Ej. Luis Suarez" required /></label>
          <label>Telefono de contacto<input name="phone" type="tel" placeholder="940560934" required /></label>
          <label>Sede
            <select name="sede" required value={selectedSede} onChange={(event) => { setSelectedSede(event.target.value); setSelectedTableId(''); }}>
              <option value="">Selecciona una sede</option>
              {locations.map(([district]) => <option key={district} value={district}>{district}</option>)}
            </select>
          </label>
          <div className="two-columns">
            <label>Fecha de visita<input name="visitDate" type="date" required /></label>
            <label>Hora de llegada
              <select name="visitTime" required defaultValue="">
                <option value="">Selecciona un horario</option>
                {reservationTimes.map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
            </label>
          </div>
          <label>Mesa
            {/* Forzar actualización de versión de mesas */}
            <select name="mesaId" required disabled={!availableTables.length} value={selectedTableId} onChange={(event) => setSelectedTableId(event.target.value)}>
              <option value="">{selectedSede ? (availableTables.length ? 'Selecciona una mesa' : 'No hay mesas disponibles en esta sede') : 'Selecciona primero una sede'}</option>
             {availableTables.map((table, index) => (
               <option key={table.idmesa || index} value={table.idmesa}>
                  {`Mesa ${index + 1} (${table.cantidadsillas || 4} sillas)`}
                </option>
              ))}
            </select>
          </label>
          <label>Numero de personas<input name="guests" type="number" min="1" max={selectedTable ? selectedTable.cantidadsillas : 14} placeholder="Ej. 3" required disabled={!selectedTable} /></label>
          <button className="primary-action" type="submit">Confirmar reservacion</button>
          <p className="form-message" role="status">{message}</p>
        </form>
      </div>
    </section>
  );
}

function AdminCardList({ data, actionLabel, onDelete, onAction }) {
  if (!data.length) {
    return <p className="empty-state">No hay registros por ahora.</p>;
  }

  return (
    <div className="admin-grid">
      {data.map(([name, detail, time, status], index) => (
        <article className="mini-admin-card" key={`${name}-${time}-${index}`}>
          <h3>{name}</h3>
          <p>{detail}</p>
          <p>{time}</p>
          <p><strong>{status}</strong></p>
          <button type="button" onClick={() => onAction?.(index)}>{actionLabel}</button>
          {onDelete && <button className="danger-action" type="button" onClick={() => onDelete(index)}>Eliminar</button>}
        </article>
      ))}
    </div>
  );
}

function DeliveryCardList({ deliveries, onUpdate, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [nextStatus, setNextStatus] = useState('');

  if (!deliveries.length) return <p className="empty-state">No hay registros por ahora.</p>;

  return (
    <div className="admin-grid">
      {deliveries.map(([name, order, district, status, id], index) => (
        <article className="mini-admin-card" key={id || `${order}-${index}`}>
          <h3>{name}</h3><p>{order}</p><p>{district}</p><p><strong>{status}</strong></p>
          {editingIndex === index ? <>
            <label>Estado
              <select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)}>
                {deliveryStatuses.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <button type="button" onClick={() => { onUpdate(id, { customer_name: name, order_reference: order, district, status: nextStatus }); setEditingIndex(null); }}>Guardar estado</button>
            <button type="button" onClick={() => setEditingIndex(null)}>Cancelar</button>
          </> : <button type="button" onClick={() => { setEditingIndex(index); setNextStatus(status); }}>Actualizar estado</button>}
          <button className="danger-action" type="button" onClick={() => onDelete(id)}>Eliminar</button>
        </article>
      ))}
    </div>
  );
}

function Admin({ bookings, inventory, deliveries, menuItems, onDeleteBooking, onCreateInventory, onUpdateInventory, onDeleteInventory, onCreateDelivery, onUpdateDelivery, onDeleteDelivery, onCreateMenuItem, onUpdateMenuItem, onDeleteMenuItem }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState('inventario');
  const bookingSummary = {
    pending: bookings.filter(([, , , status]) => status === 'Pendiente').length,
    confirmed: bookings.filter(([, , , status]) => status === 'Confirmada').length,
    canceled: bookings.filter(([, , , status]) => status === 'Cancelada').length
  };
  const deliverySummary = {
    requested: deliveries.filter(([, , , status]) => status === 'Solicitado').length,
    onTheWay: deliveries.filter(([, , , status]) => status === 'En camino').length,
    delivered: deliveries.filter(([, , , status]) => status === 'Entregado').length
  };

  if (!loggedIn) {
    return (
      <section className="view active">
        <div className="page-shell admin-shell">
          <section className="login-panel">
            <div className="admin-card login-card">
              <img className="brand-logo big" src={img('LOGO.png')} alt="FAST-FOOD PERU" />
              <h1>Acceso del propietario</h1>
              <p>Bienvenido al panel de control.</p>
              <form onSubmit={(event) => { event.preventDefault(); setLoggedIn(true); }}>
                <label>Usuario<input type="text" defaultValue="AdminPeru01" /></label>
                <label>Contrasena<input type="password" defaultValue="123456" /></label>
                <button className="primary-action" type="submit">Iniciar sesion</button>
              </form>
            </div>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="view active">
      <div className="page-shell admin-shell">
        <section className="admin-dashboard">
          <div className="admin-menu">
            <h1>Menu principal</h1>
            <button type="button" onClick={() => setTab('inventario')}>Inventario</button>
            <button type="button" onClick={() => setTab('reservas')}>Reservaciones</button>
            <button type="button" onClick={() => setTab('delivery')}>Deliverys</button>
            <button type="button" onClick={() => setTab('carta')}>Carta</button>
          </div>

          {tab === 'inventario' && (
            <section className="admin-panel active">
              <div className="admin-title"><p className="eyebrow">Panel</p><h2>Inventario</h2></div>
              <form className="reservation-form" onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                await onCreateInventory({ name: form.elements.name.value, quantity: Number(form.elements.quantity.value), unit: form.elements.unit.value || 'unidades' });
                form.reset();
              }}>
                <label>Producto<input name="name" required /></label>
                <div className="two-columns"><label>Cantidad<input name="quantity" type="number" min="0" required /></label><label>Detalle<input name="unit" placeholder="unidades" /></label></div>
                <button className="mini-action" type="submit">Agregar insumo</button>
              </form>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Item</th><th>Cantidad</th><th>Acciones</th></tr></thead>
                  <tbody>
                    {inventory.map(([item, quantity, id, unit], index) => (
                      <tr key={item}>
                        <td>{index + 1}. {item}</td>
                        <td>{quantity} {unit}</td>
                        <td><div className="table-actions"><button type="button" onClick={() => {
                          const value = window.prompt(`Nueva cantidad para ${item}`, quantity);
                          if (value !== null && value !== '' && !Number.isNaN(Number(value))) onUpdateInventory(id, { name: item, quantity: Number(value), unit });
                        }}>Editar</button><button type="button" onClick={() => onDeleteInventory(id)}>Quitar</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {tab === 'reservas' && (
            <section className="admin-panel active">
              <div className="admin-title"><p className="eyebrow">Panel</p><h2>Reservaciones</h2></div>
              <div className="metric-grid">
                <article><span>{String(bookingSummary.pending).padStart(2, '0')}</span><small>Pendientes</small></article>
                <article><span>{String(bookingSummary.confirmed).padStart(2, '0')}</span><small>Confirmadas</small></article>
                <article><span>{String(bookingSummary.canceled).padStart(2, '0')}</span><small>Canceladas</small></article>
              </div>
              <AdminCardList data={bookings} actionLabel="Atender" onDelete={onDeleteBooking} />
            </section>
          )}

          {tab === 'delivery' && (
            <section className="admin-panel active">
              <div className="admin-title"><p className="eyebrow">Panel</p><h2>Deliverys</h2></div>
              <div className="metric-grid">
                <article><span>{String(deliverySummary.requested).padStart(2, '0')}</span><small>Solicitudes</small></article>
                <article><span>{String(deliverySummary.onTheWay).padStart(2, '0')}</span><small>En camino</small></article>
                <article><span>{String(deliverySummary.delivered).padStart(2, '0')}</span><small>Entregados</small></article>
              </div>
              <form className="reservation-form" onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                await onCreateDelivery({ customer_name: form.elements.customer.value, order_reference: form.elements.order.value, district: form.elements.district.value, status: 'Solicitado' });
                form.reset();
              }}>
                <label>Cliente<input name="customer" required /></label>
                <div className="two-columns"><label>Pedido<input name="order" required /></label><label>Distrito<input name="district" required /></label></div>
                <button className="mini-action" type="submit">Registrar delivery</button>
              </form>
              <DeliveryCardList deliveries={deliveries} onUpdate={onUpdateDelivery} onDelete={onDeleteDelivery} />
            </section>
          )}

          {tab === 'carta' && (
            <section className="admin-panel active">
              <div className="admin-title"><p className="eyebrow">Panel</p><h2>Carta</h2></div>
              <form className="reservation-form" onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                await onCreateMenuItem({ category: form.elements.category.value, name: form.elements.name.value, description: form.elements.description.value, price: Number(form.elements.price.value), image: form.elements.image.value, available: true });
                form.reset();
              }}>
                <div className="two-columns"><label>Categoria<input name="category" required /></label><label>Producto<input name="name" required /></label></div>
                <label>Descripcion<input name="description" required /></label>
                <div className="two-columns"><label>Precio<input name="price" type="number" min="0" step="0.10" required /></label><label>Imagen<input name="image" placeholder="archivo.jpeg" /></label></div>
                <button className="mini-action" type="submit">Agregar producto</button>
              </form>
              <div className="admin-grid">
                {menuItems.map((item) => <article className="mini-admin-card" key={item.id}><h3>{item.name}</h3><p>{item.category}</p><p>S/ {Number(item.price).toFixed(2)}</p>{item.protected ? <p><strong>Producto protegido</strong></p> : <><button type="button" onClick={() => {
                  const price = window.prompt(`Nuevo precio para ${item.name}`, item.price);
                  if (price !== null && price !== '' && !Number.isNaN(Number(price))) onUpdateMenuItem(item.id, { ...item, price: Number(price) });
                }}>Editar precio</button><button className="danger-action" type="button" onClick={() => onDeleteMenuItem(item.id)}>Eliminar</button></>}</article>)}
              </div>
            </section>
          )}
        </section>
      </div>
    </section>
  );
}

function App() {
  const [activeView, setActiveView] = useState('inicio');
  const [selectedSede, setSelectedSede] = useState('');
  const [bookingsState, setBookingsState] = useState(initialBookings);
  const [menuItems, setMenuItems] = useState(protectedMenuItems);
  const [inventoryState, setInventoryState] = useState(inventory);
  const [deliveriesState, setDeliveriesState] = useState(deliveries);

  useEffect(() => {
    fetch(apiUrl('/api/reservations'))
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar las reservaciones.');
        return response.json();
      })
      .then((reservations) => setBookingsState(reservations.map((reservation) => [
        reservation.guest_name,
        `${reservation.guests} ${reservation.guests === 1 ? 'persona' : 'personas'} - Tel: ${reservation.phone} - Sede: ${reservation.sede || 'No especificada'}`,
        `${reservation.visit_date} ${String(reservation.visit_time).slice(0, 5)}`,
        reservation.status,
        reservation.id,
        reservation.phone,
        reservation.sede || ''
      ])))
      .catch(() => setBookingsState([]));
  }, []);

  useEffect(() => {
    apiRequest('/api/menu-items').then(async (items) => {
      const missingProducts = protectedMenuItems.filter((baseItem) => !items.some((item) => productKey(item) === productKey(baseItem)));
      const restoredProducts = await Promise.all(missingProducts.map(async ({ id, protected: isProtected, ...item }) => {
        try {
          return await apiRequest('/api/menu-items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
        } catch (error) {
          return item;
        }
      }));
      setMenuItems(removeDuplicateMenuItems([...items, ...restoredProducts]).map(normalizeMenuItem));
    }).catch(() => setMenuItems(protectedMenuItems));
    apiRequest('/api/inventories').then((items) => setInventoryState(items.map((item) => [item.name, item.quantity, item.id, item.unit]))).catch(() => setInventoryState([]));
    apiRequest('/api/deliveries').then((items) => setDeliveriesState(items.map((item) => [item.customer_name, item.order_reference, item.district, item.status, item.id]))).catch(() => setDeliveriesState([]));
  }, []);

  async function addBooking(reservation) {
    const phone = normalizePhone(reservation.phone);
    if (bookingsState.some((booking) => normalizePhone(booking[5]) === phone)) {
      throw new Error('Solo se permite una reserva por cliente. Este numero ya tiene una reserva registrada.');
    }
    const response = await fetch(apiUrl('/api/reservations'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(reservation)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const validationMessage = errorData?.errors ? Object.values(errorData.errors).flat()[0] : null;
      throw new Error(validationMessage || errorData?.message || 'No se pudo registrar la reservacion.');
    }
    const saved = await response.json();
    const booking = [
      saved.guest_name,
      `${saved.guests} ${saved.guests === 1 ? 'persona' : 'personas'} - Tel: ${saved.phone} - Sede: ${saved.sede || reservation.sede}`,
      `${saved.visit_date} ${String(saved.visit_time).slice(0, 5)}`,
      saved.status,
      saved.id,
      saved.phone,
      saved.sede || reservation.sede
    ];
    setBookingsState((currentBookings) => [booking, ...currentBookings]);
  }

  async function deleteBooking(indexToDelete) {
    const reservationId = bookingsState[indexToDelete]?.[4];
    if (reservationId) {
      const response = await fetch(apiUrl(`/api/reservations/${reservationId}`), { method: 'DELETE' });
      if (!response.ok) return;
    }
    setBookingsState((currentBookings) => currentBookings.filter((_, index) => index !== indexToDelete));
  }

  async function createInventory(item) {
    const saved = await apiRequest('/api/inventories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
    setInventoryState((current) => [...current, [saved.name, saved.quantity, saved.id, saved.unit]]);
  }

  async function updateInventory(id, item) {
    if (!id) return;
    const saved = await apiRequest(`/api/inventories/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
    setInventoryState((current) => current.map((entry) => entry[2] === id ? [saved.name, saved.quantity, saved.id, saved.unit] : entry));
  }

  async function deleteInventory(id) {
    if (!id) return;
    await apiRequest(`/api/inventories/${id}`, { method: 'DELETE' });
    setInventoryState((current) => current.filter((entry) => entry[2] !== id));
  }

  async function createDelivery(delivery) {
    const saved = await apiRequest('/api/deliveries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(delivery) });
    setDeliveriesState((current) => [[saved.customer_name, saved.order_reference, saved.district, saved.status, saved.id], ...current]);
  }

  async function updateDelivery(id, delivery) {
    if (!id) return;
    const saved = await apiRequest(`/api/deliveries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(delivery) });
    setDeliveriesState((current) => current.map((entry) => entry[4] === id ? [saved.customer_name, saved.order_reference, saved.district, saved.status, saved.id] : entry));
  }

  async function deleteDelivery(id) {
    if (!id) return;
    await apiRequest(`/api/deliveries/${id}`, { method: 'DELETE' });
    setDeliveriesState((current) => current.filter((entry) => entry[4] !== id));
  }

  async function createMenuItem(item) {
    const saved = await apiRequest('/api/menu-items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
    setMenuItems((current) => [...current, { ...saved, protected: false }]);
  }

  async function updateMenuItem(id, item) {
    const saved = await apiRequest(`/api/menu-items/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
    setMenuItems((current) => current.map((entry) => entry.id === id ? saved : entry));
  }

  async function deleteMenuItem(id) {
    if (menuItems.some((item) => item.id === id && item.protected)) return;
    await apiRequest(`/api/menu-items/${id}`, { method: 'DELETE' });
    setMenuItems((current) => current.filter((item) => item.id !== id));
  }

  function changeView(view, sede = '') {
    setActiveView(view);
    if (view === 'reserva') setSelectedSede(sede);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="restaurant-app">
      <img className="watermark-logo" src={img('LOGO.png')} alt="" aria-hidden="true" />
      <Header activeView={activeView} onViewChange={changeView} />
      <main>
        {activeView === 'inicio' && <Home onViewChange={changeView} />}
        {activeView === 'carta' && <Menu menuItems={menuItems} />}
        {activeView === 'locales' && <Locations onViewChange={changeView} />}
        {activeView === 'reserva' && <Reservation onAddBooking={addBooking} initialSede={selectedSede} />}
        {activeView === 'admin' && <Admin bookings={bookingsState} inventory={inventoryState} deliveries={deliveriesState} menuItems={menuItems} onDeleteBooking={deleteBooking} onCreateInventory={createInventory} onUpdateInventory={updateInventory} onDeleteInventory={deleteInventory} onCreateDelivery={createDelivery} onUpdateDelivery={updateDelivery} onDeleteDelivery={deleteDelivery} onCreateMenuItem={createMenuItem} onUpdateMenuItem={updateMenuItem} onDeleteMenuItem={deleteMenuItem} />}
      </main>
      <footer className="site-footer">
        <div><strong>FAST-FOOD PERU</strong><span>Delivery, reservas y combos.</span></div>
        <span>Copyright 2026 - Fast-Food Peru</span>
      </footer>
    </div>
  );
}

export default App;
