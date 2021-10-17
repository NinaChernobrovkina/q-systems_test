const Main = {
  template: `
    <div class="promo">
      <div class="promo__text">{{{promo_text}}}</div>
      <button class="promo__button" type="button">{{button_text}}</button>
    </div>
    <div class="content">
      <div class="content__text">{{{content_text}}}</div>
      <button class="content__button" type="button">{{button_text}}</button>
    </div>
  `,
  init: function () {

  }
};

const Plan = {
  template: `
    <div class="plan">
      <ul class="plan__sections">
        {{#sections}}
        <li class="plan__section" data-code="{{code}}">
          <div class="plan__section-header">
            Раздел {{number}}:<br>
            <span class="plan__section-title">{{{title}}}</span>
          </div>
          <ul class="plan__section-themes">
            {{#themes}}
            <li class="plan__section-theme">№{{number}} {{title}}</li>
            {{/themes}}
          </ul>
        </li>
        {{/sections}}
      </ul>
      <ul class="plan__parts">
        {{#parts}}
        <li class="plan__part" data-code="{{code}}">
          <div class="plan__part-header">{{number}} часть</div>
          <ul class="plan__part-themes">
            {{#themes}}
            <li class="plan__part-theme">№{{number}} {{title}}</li>
            {{/themes}}
          </ul>
        </li>
        {{/parts}}
      </ul>
    </div>
  `,
  init: function () {
    $('.plan__section, .plan__part').on('click', (evt) => {
      const code = evt.currentTarget.dataset.code;
      $.get({
        url: `api/plan/${code}.json`,
        dataType: 'json',
      }).done((data) => {
        const html = Mustache.render(App.pages.plan_detail.template, data);
        $('.main').empty().append(html);
        App.pages.plan_detail.init();
      });
    });
  }
};

const PlanDetail = {
  template: `
    <div class="plan-detail">
      <h1 class="plan-detail__title">{{type}} {{number}}:<br>{{{title}}}</h1>
      <div class="plan-detail__content">{{{content}}}</div>
      <div class="plan-detail__themes">
        <p class="plan-detail__themes-title">Темы в этом разделе:</p>
        <ul class="plan-detail__themes-list">
          {{#themes}}
            <li class="plan-detail__themes-item"><span class="plan-detail__themes-number">№{{number}}</span> {{title}}</li>
          {{/themes}}
        </ul>
      </div>
      <a href="#" class="plan-detail__task-link">Перейти к решению заданий из раздела</a>
    </div>
  `,
  init: function () {

  }
};

const App = {
  pages: {
    main: Main,
    plan: Plan,
    plan_detail: PlanDetail,
  },
  init: function () {
    $('.nav__link').on('click', (evt) => {
      evt.preventDefault();
      const page = evt.target.dataset.page;
      $.get({
        url: `api/${page}.json`,
        dataType: 'json',
      }).done((data) => {
        const html = Mustache.render(this.pages[page].template, data);
        $('.main').empty().append(html);
        this.pages[page].init();
      });
    });
  }
};

App.init();
