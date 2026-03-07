import React from 'react';

function Home() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    field: '',
    location: '',
    date: ''
  });
  const [status, setStatus] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:3558';
      const apiUrl = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
      const response = await fetch(`${apiUrl}/api/submissions`, {
        method: 'POST',


        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.field,
          location: formData.location,
          date: formData.date
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', field: '', location: '', date: '' });
        alert('Müraciətiniz qəbul olundu!');
      } else {
        setStatus('error');
        alert('Xəta baş verdi. Yenidən cəhd edin.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      alert('Xəta baş verdi. Şəbəkə bağlantısını yoxlayın.');
    }
  };

  return (
    <>
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'none',
          backgroundColor: '#000'
        }}
      >
        <div
          className="video-background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          >
            <source
              src="https://cdn.prod.website-files.com/6710f912b08f2b5f7beec811%2F67137b863467616e3790e77f_bg-video-transcode.mp4"
              type="video/mp4"
            />
            <source
              src="https://cdn.prod.website-files.com/6710f912b08f2b5f7beec811%2F67137b863467616e3790e77f_bg-video-transcode.webm"
              type="video/webm"
            />
          </video>
        </div>
        <div className="hero-overlay" />
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-hero">
            <div className="hero-content-wrap">
              <h1 className="hero-title">Yüksək Standartlı Təmizlik Həlləri</h1>
              <p className="hero-description">
                Keyfiyyət təsadüfi olmur. O, planın və nəzarətin nəticəsidir. Peşəkar yanaşma. Sistemli proses. Zəmanətli
                nəticə.
              </p>
            </div>
            <div className="hero-form-wrap">
              <h2 className="hero-form-title">Fərdi Təklif Al</h2>
              <div className="no-margin w-form">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="home-name">Adınız</label>
                  <input
                    className="form-input w-input"
                    maxLength="256"
                    name="name"
                    placeholder="Adınız və Soyadınız"
                    type="text"
                    id="home-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="home-email">Email</label>
                  <input
                    className="form-input w-input"
                    maxLength="256"
                    name="email"
                    placeholder="nümunə@gmail.com"
                    type="email"
                    id="home-email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-input-wrap">
                    <div className="input-group no-margin">
                      <label htmlFor="home-phone">Telefon</label>
                      <input
                        className="form-input w-input"
                        maxLength="256"
                        name="phone"
                        placeholder="+994 XX XXX XX XX"
                        type="tel"
                        id="home-phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group no-margin">
                      <label htmlFor="home-field">Xidməti seçin</label>
                      <select
                        id="home-field"
                        name="field"
                        className="form-select w-select"
                        value={formData.field}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Xidməti seçin</option>
                        <option value="office">Ofis və Biznes mərkəzi</option>
                        <option value="facade">Fasad və Şüşə</option>
                        <option value="manager-check">Məsul menecer yoxlaması</option>
                        <option value="post-renovation">Təmir Sonrası Təmizlik</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-input-wrap">
                    <div className="input-group no-margin">
                      <label htmlFor="home-location">Ünvan</label>
                      <input
                        className="form-input w-input"
                        maxLength="256"
                        name="location"
                        placeholder="Bakı"
                        type="text"
                        id="home-location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group no-margin">
                      <label htmlFor="home-date">Tarix</label>
                      <input
                        className="form-input w-input"
                        maxLength="256"
                        name="date"
                        placeholder="dd-mm-yy"
                        type="text"
                        id="home-date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="hero-form-button-wrap">
                    <button
                      type="submit"
                      className="button-primary-2 button-full w-button"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? 'Göndərilir...' : 'Göndər'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section section-spacing">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-about">
            <h3 className="about-section-title">
              Abbasoğlu təmizlik xidməti 2012-ci ildən təmizlik bazarında fəaliyyət göstərir.
            </h3>
            <div className="about-content">
              <p className="no-margin">
                Şirkətin əsas fəaliyyət sahəsi peşəkar təmizlik xidmətlərinin göstərilməsidir. Biz strukturlaşdırılmış
                xidmət modeli tətbiq edirik.
              </p>
            </div>
          </div>
          <div className="w-layout-grid grid-about-counter">
            <div className="about-image-wrap">
              <img
                width="250"
                loading="eager"
                alt="About Image"
                src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757ceddb349734812b1bfdd_about-image.avif"
                className="about-image"
              />
            </div>
            <div className="about-counter-item">
              <h2 className="about-counter-number">
                1000<span className="text-primary-2">+</span>
              </h2>
              <div>
                <h2 className="about-counter-title">Tamamlanmış layihə</h2>
                <p className="about-counter-description">
                  İllərin təcrübəsi və hər zaman yüksək müştəri məmnuniyyəti.
                </p>
              </div>
            </div>
            <div className="about-counter-item">
              <div>
                <h3 className="about-counter-title">İl təcrübə</h3>
                <p className="about-counter-description">
                  Təmizlik xidməti sahəsində peşəkar fəaliyyət göstərdiyimiz illər.
                </p>
              </div>
              <h2 className="about-counter-number">
                13<span className="text-primary-2">+</span>
              </h2>
            </div>
            <div className="about-counter-item">
              <h2 className="about-counter-number">
                100<span className="text-primary-2">%</span>
              </h2>
              <div>
                <h2 className="about-counter-title">Məmnun müştəri</h2>
                <p className="about-counter-description">
                  Yüzlərlə məmnun müştəri və daimi tərəfdaşlıqlar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
