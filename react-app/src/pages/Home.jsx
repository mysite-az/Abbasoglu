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

      {/* service-section */}
      <section className="service-section section-spacing">
        <div className="w-layout-blockcontainer container w-container">
          <div className="service-section-title-wrap" style={{ opacity: 1 }}>
            <h2 className="service-section-title">Xidmətlərimiz</h2>
            <a href="/services" className="button-primary-2 w-button">Bütün xidmətlər</a>
          </div>
          <div className="service-wrap" style={{ opacity: 1 }}>
            <a href="/services" className="service-item w-inline-block">
              <div className="w-layout-grid grid-service-item">
                <div className="service-title-wrap">
                  <div className="service-icon-wrap">
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf5a_service-icon-01.svg" className="service-icon" />
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf46_service-hover-icon-01.svg" className="service-hover-icon" />
                  </div>
                  <h3 className="service-title">Ofis və Biznes mərkəzi</h3>
                </div>
                <div className="service-hover-image-wrap">
                  <img width="400" alt="Service Image" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf57_service-image-01.avif" loading="eager" className="service-hover-image" />
                </div>
                <div className="service-content-wrap">
                  <p className="service-description">Sabit və yüksək səviyyəli xidmət. Müqaviləli xidmət və keyfiyyət hesabatı.</p>
                </div>
              </div>
              <div className="service-divider" />
            </a>
            
            <a href="/services" className="service-item w-inline-block">
              <div className="w-layout-grid grid-service-item">
                <div className="service-title-wrap">
                  <div className="service-icon-wrap">
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf49_service-icon-02.svg" className="service-icon" />
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf45_service-hover-icon-02.svg" className="service-hover-icon" />
                  </div>
                  <h3 className="service-title">Fasad və Şüşə</h3>
                </div>
                <div className="service-hover-image-wrap">
                  <img width="400" alt="Service Image" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf4b_service-image-02.avif" loading="eager" className="service-hover-image" />
                </div>
                <div className="service-content-wrap">
                  <p className="service-description">Binaların fasad və şüşələrinin peşəkar yuyulması.</p>
                </div>
              </div>
              <div className="service-divider" />
            </a>

            <a href="/services" className="service-item w-inline-block">
              <div className="w-layout-grid grid-service-item">
                <div className="service-title-wrap">
                  <div className="service-icon-wrap">
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf5b_service-icon-03.svg" className="service-icon" />
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf48_service-hover-icon-03.svg" className="service-hover-icon" />
                  </div>
                  <h3 className="service-title">Dezinfeksiya</h3>
                </div>
                <div className="service-hover-image-wrap">
                  <img width="400" alt="Service Image" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf4f_service-image-03.avif" loading="eager" className="service-hover-image" />
                </div>
                <div className="service-content-wrap">
                  <p className="service-description">Peşəkar dezinfeksiya xidməti ilə mikrobların, virusların və zərərli bakteriyaların tam məhv edilməsi.</p>
                </div>
              </div>
              <div className="service-divider" />
            </a>

            <a href="/services" className="service-item w-inline-block">
              <div className="w-layout-grid grid-service-item">
                <div className="service-title-wrap">
                  <div className="service-icon-wrap">
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf5c_service-icon-04.svg" className="service-icon" />
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf47_service-hover-icon-04.svg" className="service-hover-icon" />
                  </div>
                  <h3 className="service-title">Təmir Sonrası Təmizlik</h3>
                </div>
                <div className="service-hover-image-wrap">
                  <img width="400" alt="Service Image" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf53_service-image-04.avif" loading="eager" className="service-hover-image" />
                </div>
                <div className="service-content-wrap">
                  <p className="service-description">Tikinti və təmirdən sonra toz və çirklərin xüsusi texnika və vasitələrlə təmizlənməsi.</p>
                </div>
              </div>
              <div className="service-divider" />
            </a>

            <a href="/services" className="service-item w-inline-block">
              <div className="w-layout-grid grid-service-item">
                <div className="service-title-wrap">
                  <div className="service-icon-wrap">
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf5b_service-icon-03.svg" className="service-icon" />
                    <img loading="eager" alt="Service Icon" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf48_service-hover-icon-03.svg" className="service-hover-icon" />
                  </div>
                  <h3 className="service-title">Yanğın sonrası təmizlik</h3>
                </div>
                <div className="service-hover-image-wrap" />
                <div className="service-content-wrap">
                  <p className="service-description">Yanğın sonrası his, qurum və zədələnmiş materialların peşəkar şəkildə təmizlənməsi və bərpası.</p>
                </div>
              </div>
              <div className="service-divider" />
            </a>
          </div>
        </div>
      </section>

      {/* testimonial-section */}
      <section className="testimonial-section section-spacing">
        <div className="w-layout-blockcontainer container w-container">
          <div className="section-title text-center" style={{ opacity: 1, marginBottom: '40px' }}>
            <h2 className="no-margin">Bizim müştərilər və müqavilələr</h2>
          </div>
          <div className="testimonial-slider-wrapper" style={{ opacity: 1 }}>
            <div className="testimonial-slider-wrap hide-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ position: 'relative', flex: '0 0 auto', width: '350px', whiteSpace: 'normal' }}>
                <div className="testimonial-item" style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="testimonial-title-wrap">
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45763_star-image.svg" alt="Star" className="rating-image" />
                    <h5 className="testimonial-content">«Türkaz «MMC ilə birgə əməkdaşlıq çərçivəsində möhtəşəm nəticələrə imza atmışıq.</h5>
                  </div>
                  <div className="testimonial-info" style={{ marginTop: 'auto' }}>
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45779_testimonial-image01.avif" alt="Testimonial Image" className="testimonial-image" />
                    <div>
                      <h4 className="testimonial-name">"YELKEN OPERATİNG COMPANY" MMC</h4>
                      <div style={{ fontSize: '14px', color: '#666' }}>Tərəfdaş</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', flex: '0 0 auto', width: '350px', whiteSpace: 'normal' }}>
                <div className="testimonial-item one" style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="testimonial-title-wrap">
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c4576d_half-star-image.svg" alt="Star" className="rating-image" />
                    <h5 className="testimonial-content">Layihə ərzində yüksək peşəkarlıq və operativlik nümayiş etdirilmişdir.</h5>
                  </div>
                  <div className="testimonial-info" style={{ marginTop: 'auto' }}>
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45773_testimonial-image02.avif" alt="Testimonial Image" className="testimonial-image" />
                    <div>
                      <h5 className="testimonial-name">“SU İDMANI SARAYI” MMC</h5>
                      <div style={{ fontSize: '14px', color: '#666' }}>Tərəfdaş</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', flex: '0 0 auto', width: '350px', whiteSpace: 'normal' }}>
                <div className="testimonial-item" style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="testimonial-title-wrap">
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45763_star-image.svg" alt="Star" className="rating-image" />
                    <h5 className="testimonial-content">Otelin açılışı ərəfəsində bütün otaqlar və ictimai sahələr mükəmməl şəkildə təmizləndi.</h5>
                  </div>
                  <div className="testimonial-info" style={{ marginTop: 'auto' }}>
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45765_testimonial-image03.avif" alt="Testimonial Image" className="testimonial-image" />
                    <div>
                      <h5 className="testimonial-name">“Yeni Abşeron Oteli” MMC</h5>
                      <div style={{ fontSize: '14px', color: '#666' }}>Tərəfdaş</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', flex: '0 0 auto', width: '350px', whiteSpace: 'normal' }}>
                <div className="testimonial-item one" style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="testimonial-title-wrap">
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c4576d_half-star-image.svg" alt="Star" className="rating-image" />
                    <h5 className="testimonial-content">Uzunmüddətli əməkdaşlığımız ərzində hər zaman yüksək xidmət standartları gördük.</h5>
                  </div>
                  <div className="testimonial-info" style={{ marginTop: 'auto' }}>
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c4576f_testimonial-image04.avif" alt="Testimonial Image" className="testimonial-image" />
                    <div>
                      <h5 className="testimonial-name">SGC Azerbaijan MMC</h5>
                      <div style={{ fontSize: '14px', color: '#666' }}>Tərəfdaş</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', flex: '0 0 auto', width: '350px', whiteSpace: 'normal' }}>
                <div className="testimonial-item" style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="testimonial-title-wrap">
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45763_star-image.svg" alt="Star" className="rating-image" />
                    <h5 className="testimonial-content">Klinikamızda tələb olunan xüsusi sanitar-gigiyenik qaydalara tam əməl olunur.</h5>
                  </div>
                  <div className="testimonial-info" style={{ marginTop: 'auto' }}>
                    <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d0dc723bb74b29c45769_testimonial-image05.avif" alt="Testimonial Image" className="testimonial-image" />
                    <div>
                      <h5 className="testimonial-name">Azpulmat MMC / MZ Plaza</h5>
                      <div style={{ fontSize: '14px', color: '#666' }}>Tərəfdaş</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* our-work-section */}
      <section className="our-work-section section-spacing" style={{ backgroundColor: '#f5f7fa', padding: '80px 0' }}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="section-title text-center" style={{ marginBottom: '40px' }}>
            <h2 className="no-margin">Gördüyümüz işlər</h2>
          </div>
          <div className="work-gallery-wrapper hide-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
            <div className="work-slide" style={{ flex: '0 0 auto', minWidth: '300px' }}>
              <img src="https://customer-assets.emergentagent.com/job_site-snapshot-18/artifacts/207w1c10_Screenshot%202026-03-09%20at%2022.46.36.png" alt="Gördüyümüz iş 1" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="work-slide" style={{ flex: '0 0 auto', minWidth: '300px' }}>
              <img src="https://customer-assets.emergentagent.com/job_site-snapshot-18/artifacts/kdfc1kad_Screenshot%202026-03-09%20at%2022.46.50.png" alt="Gördüyümüz iş 2" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="work-slide" style={{ flex: '0 0 auto', minWidth: '300px' }}>
              <img src="https://customer-assets.emergentagent.com/job_site-snapshot-18/artifacts/9dd1v2tu_Screenshot%202026-03-09%20at%2022.47.00.png" alt="Gördüyümüz iş 3" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="work-slide" style={{ flex: '0 0 auto', minWidth: '300px' }}>
              <img src="https://customer-assets.emergentagent.com/job_site-snapshot-18/artifacts/76sym2pp_Screenshot%202026-03-09%20at%2022.47.07.png" alt="Gördüyümüz iş 4" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="work-slide" style={{ flex: '0 0 auto', minWidth: '300px' }}>
              <img src="https://customer-assets.emergentagent.com/job_site-snapshot-18/artifacts/4ywgugwy_Screenshot%202026-03-09%20at%2022.47.20.png" alt="Gördüyümüz iş 5" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* blog-section */}
      <section className="blog-section section-spacing">
        <div className="w-layout-blockcontainer container w-container">
          <div className="blog-section-title-wrap" style={{ opacity: 1 }}>
            <h2 className="no-margin">Üstünlüklərimiz</h2>
          </div>
          <div className="w-dyn-list">
            <div role="list" className="grid-blog w-dyn-items" style={{ opacity: 1 }}>
              <div role="listitem" className="w-dyn-item">
                <a aria-label="link" href="/blogs" className="blog-item w-inline-block">
                  <div className="blog-image-wrap">
                    <img loading="eager" alt="blog-img" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f66/675831dbd09bca6b3645b81c_blog-image-01.jpg" className="blog-image" />
                  </div>
                  <div className="blog-info">
                    <div className="blog-detail">
                      <div className="blog-category">Sistem mərhələsi</div>
                      <div>Zəmanətli Nəticə</div>
                    </div>
                    <h3 style={{ color: "rgb(30, 30, 30)" }} className="blog-title">Strukturlaşdırılmış iş planı və sistemli yanaşma</h3>
                  </div>
                </a>
              </div>
              <div role="listitem" className="w-dyn-item">
                <a aria-label="link" href="/blogs" className="blog-item w-inline-block">
                  <div className="blog-image-wrap">
                    <img loading="eager" alt="blog-img" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f66/675831ea6c69f201e11796e6_blog-image-02.jpg" className="blog-image" />
                  </div>
                  <div className="blog-info">
                    <div className="blog-detail">
                      <div className="blog-category">İşçi mütəxəssislər</div>
                      <div>Zəmanətli Nəticə</div>
                    </div>
                    <h3 style={{ color: "rgb(30, 30, 30)" }} className="blog-title">Təlimli və daimi komanda, səlis xidmət</h3>
                  </div>
                </a>
              </div>
              <div role="listitem" className="w-dyn-item">
                <a aria-label="link" href="/blogs" className="blog-item w-inline-block">
                  <div className="blog-image-wrap">
                    <img loading="eager" alt="blog-img" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f66/675831f32732da7c3256df6a_blog-image-03.jpg" className="blog-image" />
                  </div>
                  <div className="blog-info">
                    <div className="blog-detail">
                      <div className="blog-category">Avadanlıqlar</div>
                      <div>Zəmanətli Nəticə</div>
                    </div>
                    <h3 style={{ color: "rgb(30, 30, 30)" }} className="blog-title">Müasir avadanlıq və keyfiyyətə nəzarət mərhələsi</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
