import paragraphsHtml from '!!raw-loader!./examples/paragraphs.html';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docs-typography-paragraphs',
  template: `
    <ngx-doc-example heading="Paragraphs" id="paragraphs">
      <p>
        As cyber attacks continue to rise, organizations are investing heavily
        in attack identification, threat intelligence and the staff required to
        protect the enterprise. However, alerts are still going unresolved, and
        often unseen. Realizing that simply adding people does not solve the
        problem, organizations are choosing Swimlane for security automation and
        orchestration
      </p>
      <p>
        Swimlane consolidates security alerts from multiple sources and
        automatically assists organizations with the activities required to
        resolve alerts and stop attacks. The resolution of the alert can occur
        either automatically or manually by analyst intervention. Either way,
        the alert is resolved utilizing expert-defined processes, enabling the
        organization to cost-effectively close alerts.
      </p>
      <p class="hint">
        Paragraphs with the 'hint' class are styled smaller with italics.
      </p>
      <p class="thin">
        Paragraphs with the 'thin' class are light font weight.
      </p>
      <p class="ultra-thin">
        Paragraphs with the 'ultra-thin' class are extra light font weight.
      </p>

      <ngx-doc-markdown
        [code]="paragraphsHtml"
        lang="markup"
      ></ngx-doc-markdown>
    </ngx-doc-example>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyParagraphsComponent {
  readonly paragraphsHtml = paragraphsHtml;
}
