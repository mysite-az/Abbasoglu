import React from 'react';

function Services() {
  return (
    <>
      <section className="service-hero-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-service-hero">
            <div className="service-hero-title-wrap">
              <h1 className="service-hero-title">Ekspert təmizlik həlləri</h1>
              <p className="service-hero-description">
                Biz sizin unikal ehtiyaclarınıza uyğunlaşdırılmış ən yüksək səviyyəli təmizlik xidmətləri təqdim
                etməkdən qürur duyuruq.
              </p>
            </div>
            <div className="service-hero-image-wrap">
              <img
                width="495"
                loading="eager"
                alt="Service Image"
                src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/67591346b4d718be00989131_service-image.avif"
                className="service-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-one-section section-spacing">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-service-one">
            <div className="service-one-item">
              <div>
                <div className="service-one-image-wrap">
                  <img
                    loading="eager"
                    alt="Service Image"
                    src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf57_service-image-01.avif"
                    className="service-one-image"
                  />
                </div>
                <div className="service-one-info">
                  <h2 className="service-one-title">Ofis və Biznes mərkəzi</h2>
                  <p className="service-one-description">
                    Sabit və yüksək səviyyəli xidmət. Müqaviləli xidmət və keyfiyyət hesabatı.
                  </p>
                </div>
              </div>
            </div>

            <div className="service-one-item">
              <div>
                <div className="service-one-image-wrap">
                  <img
                    loading="eager"
                    alt="Service Image"
                    src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf4b_service-image-02.avif"
                    className="service-one-image"
                  />
                </div>
                <div className="service-one-info">
                  <div>
                    <h3 className="service-one-title">Fasad və Şüşə</h3>
                    <p className="service-one-description">
                      Binaların fasad və şüşələrinin peşəkar yuyulması.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-one-item">
              <div>
                <div className="service-one-image-wrap">
                  <img
                    loading="eager"
                    alt="Service Image"
                    src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757cfffc7e5ff9daae7bf53_service-image-04.avif"
                    className="service-one-image"
                  />
                </div>
                <div className="service-one-info">
                  <h5 className="service-one-title">Təmir Sonrası Təmizlik</h5>
                  <p className="service-one-description">
                    Tikinti və təmirdən sonra toz və çirklərin xüsusi texnika və vasitələrlə təmizlənməsi.
                  </p>
                </div>
              </div>
            </div>

            <div className="service-one-item">
              <div>
                <div className="service-one-image-wrap" />
                <div className="service-one-info">
                  <h5 className="service-one-title">Dezinfeksiya</h5>
                  <p className="service-one-description">
                    Məkanların virus və bakteriyalardan tam təmizlənməsi. Peşəkar dezinfeksiya xidməti.
                  </p>
                </div>
              </div>
            </div>

            <div className="service-one-item">
              <div>
                <div className="service-one-image-wrap" />
                <div className="service-one-info">
                  <h5 className="service-one-title">Yanğından sonra təmizlik</h5>
                  <p className="service-one-description">
                    Yanğın sonrası his, his qoxusu və çirklərin xüsusi texnologiya ilə təmizlənməsi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about-center-section */}
      <section className="about-center-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="about-center-wrap">
            <h2 className="about-center-title" style={{ opacity: 1 }}>Sarsılmaz fədakarlıq və ən yüksək standart keyfiyyətlə təmizlik xidmətləri göstəririk</h2>
            <div className="w-layout-grid grid-counter" style={{ opacity: 1 }}>
              <div className="counter-item">
                <h3 className="counter-number">300<span className="text-primary-2">+</span></h3>
                <h4 className="counter-title">Tamamlanmış layihə</h4>
              </div>
              <div className="counter-item">
                <h3 className="counter-number">98<span className="text-primary-2">%</span></h3>
                <h4 className="counter-title">Məmnun müştəri</h4>
              </div>
              <div className="counter-item">
                <h3 className="counter-number">50<span className="text-primary-2">+</span></h3>
                <h4 className="counter-title">Peşəkar əməkdaş</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* request-demo-section */}
      <section className="request-demo-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-request-form" style={{ opacity: 1 }}>
            <div className="request-demo-image-wrap">
              <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6757d9461e0346b02f5d4fd2_contact-image.avif" alt="Contact Image" className="request-demo-image" />
            </div>
            <div className="request-demo-form-wrap">
              <h4 className="request-demo-title">Xidmət sifariş edin</h4>
              <div className="no-margin w-form">
                <form id="wf-form-Request-A-Demo-Form" name="wf-form-Request-A-Demo-Form" data-name="Request A Demo Form" method="get">
                  <label htmlFor="Name">Adınız</label>
                  <input className="form-input contact-input w-input" maxLength={256} name="Name" data-name="Name" placeholder="Dennis barrett" type="text" id="Name" />
                  <label htmlFor="Email">Email</label>
                  <input className="form-input contact-input w-input" maxLength={256} name="Email" data-name="Email" placeholder="example@gmail.com" type="email" id="Email" required />
                  <div className="form-input-wrap">
                    <div className="input-group no-margin">
                      <label htmlFor="Phone">Telefon</label>
                      <input className="form-input contact-input w-input" maxLength={256} name="Phone" data-name="Phone" placeholder="+1234567890" type="tel" id="Phone" />
                    </div>
                    <div className="input-group no-margin">
                      <label htmlFor="Field">Xidmət seçin</label>
                      <select id="Field" name="Field" data-name="Field" className="form-select contact-input w-select">
                        <option value="Another option">Xidmət seçin</option>
                        <option value="">Ofis və Biznes mərkəzi</option>
                        <option value="First">Fasad və Şüşə</option>
                        <option value="Second">İctimai yerlərin təmizliyi</option>
                        <option value="Third">Təmir Sonrası Təmizlik</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-input-wrap">
                    <div className="input-group no-margin">
                      <label htmlFor="Location">Ünvan</label>
                      <input className="form-input contact-input w-input" maxLength={256} name="Location" data-name="Location" placeholder="Los angeles" type="text" id="Location" />
                    </div>
                    <div className="input-group no-margin">
                      <label htmlFor="Date">Tarix</label>
                      <input className="form-input contact-input w-input" maxLength={256} name="Date" data-name="Date" placeholder="dd-mm-yy" type="text" id="Date" />
                    </div>
                  </div>
                  <div className="hero-form-button-wrap">
                    <input type="submit" data-wait="Gözləyin..." className="button-primary-2 button-full w-button" value="Göndər" />
                  </div>
                </form>
              </div>
              <div className="request-demo-detail">
                <div>VƏ YA</div>
                <div className="request-demo-wrap">
                  <img loading="eager" src="https://cdn.prod.website-files.com/6756b988bb35f025028d3f34/6762529184f5394d604f57de_call-icon-dark.svg" alt="" className="contact-icons" />
                  <h5 className="request-a-demo-title">Bizimlə əlaqə: <a href="tel:055 444 16 02" className="request-demo-link">055 444 16 02</a> </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* faq-section */}
      <section className="faq-section section-spacing" style={{ opacity: 1 }}>
        <div className="w-layout-blockcontainer container-medium w-container">
          <div className="section-title text-center">
            <h2>Tez-tez verilən suallar</h2>
          </div>
          <div className="faq-wrap last">
            <div className="accordion-item">
              <div className="accordion-heading">
                <h3 className="accordion-title">Hansı xidmətləri təklif edirsiniz?</h3>
              </div>
              <div className="accordion-content-wrapper">
                <p className="accordion-content">Biz yaşayış sahələrinin təmizliyi, ticarət və ofis mərkəzləri, xalça yuyulması, pəncərə təmizliyi və dərindən təmizlik daxil olmaqla geniş bir təmizlik xidmətləri spektrini təklif edirik.</p>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-heading">
                <h4 className="accordion-title">Təmizlik xidmətini necə sifariş etməliyəm?</h4>
              </div>
              <div className="accordion-content-wrapper">
                <p className="accordion-content">Xidmət sifariş etmək çox asandır! Sizin üçün uyğun vaxtı onlayn şəkildə veb saytımızdan, zəng edərək və ya e-poçt vasitəsilə planlaşdıra bilərsiniz.</p>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-heading">
                <h5 className="accordion-title">Ləğv siyasətiniz nədən ibarətdir?</h5>
              </div>
              <div className="accordion-content-wrapper">
                <p className="accordion-content">Planların dəyişə biləcəyini anlayırıq. Əgər görüşünüzü ləğv etməli və ya vaxtını dəyişməli olarsınızsa, xahiş edirik ki, ən azı 24 saat əvvəldən bizimlə əlaqə saxlayasınız.</p>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-heading">
                <h6 className="accordion-title">Hər ziyarət üçün eyni təmizlik komandasını istəyə bilərəmmi?</h6>
              </div>
              <div className="accordion-content-wrapper">
                <p className="accordion-content">Müştərilərimiz üçün davamlılığı təmin etməyə çalışırıq. Əgər hər təmizlikdə eyni təlimli komandanın olmasını üstün tutursunuzsa, lütfən bildirin.</p>
              </div>
            </div>
            <div className="accordion-item last">
              <div className="accordion-heading">
                <h6 className="accordion-title">Təmizlik zamanı evdə (obyektdə) olmağım mütləqdirmi?</h6>
              </div>
              <div className="accordion-content-wrapper">
                <p className="accordion-content">Bu sizdən asılıdır! Siz təmizlik zamanı obyektdə ola da bilərsiniz, ya da təhlükəsizlik və etibarlılıqla prosesi bizə həvalə edə bilərsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;

