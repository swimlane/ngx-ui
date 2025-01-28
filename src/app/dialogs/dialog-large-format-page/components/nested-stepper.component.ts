import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-nested-stepper',
  template: `
    <ngx-stepper [readonly]="false" [(active)]="stepIndex">
      <ngx-step label="Initial Selections">
        <ng-template ngxStepContent>
          <p>
            Ut fusce consectetur tempor per tristique odio lorem adipiscing, litora sodales cursus molestie cras auctor
            ornare augue, primis massa class interdum nisl conubia quis. Commodo posuere porttitor eleifend hac proin
            senectus dictum non, aenean iaculis ut venenatis laoreet habitant volutpat, auctor conubia maximus in
            lobortis nam luctus. Arcu neque dictumst vestibulum feugiat habitant hac habitasse litora enim ad, interdum
            inceptos aliquet etiam rhoncus ante pulvinar nunc diam conubia sapien, fames posuere nascetur eu commodo
            turpis velit congue viverra. Curae libero vulputate tristique ipsum tempus, tincidunt habitant iaculis arcu
            id vitae, quis auctor nisi primis. Etiam nisl imperdiet penatibus nostra ultrices pharetra nascetur nam,
            nullam varius curae parturient eros sit eu quisque, proin lacinia a ligula egestas senectus malesuada.
            Viverra curabitur cras amet purus congue imperdiet elit, nec justo per laoreet nisi rhoncus lacus accumsan,
            leo potenti fusce turpis consectetur blandit. Duis ultricies egestas urna dignissim dictumst cursus,
            vehicula penatibus mollis euismod quam rutrum, vestibulum vivamus ultrices cubilia malesuada. Proin ad
            elementum nascetur penatibus dictum accumsan aenean, phasellus quisque convallis odio aptent lectus euismod,
            hendrerit iaculis nam mattis rhoncus feugiat. Imperdiet mollis lorem risus placerat cursus orci eu viverra
            donec duis, ligula amet adipiscing elit nec pretium ultrices at vulputate, et sapien praesent felis dui
            lectus cras taciti nascetur. Amet odio urna sit ex ligula massa tempus consequat augue purus condimentum
            erat molestie, felis integer placerat mauris aptent orci ultricies laoreet fringilla efficitur ornare in.
            Curae facilisis et habitasse class ac sem rhoncus varius ad phasellus eget montes fusce est, vel primis
            commodo suscipit iaculis volutpat sit lacinia nostra tortor porta torquent. Dignissim eros nascetur praesent
            libero habitant inceptos, natoque efficitur taciti venenatis lacinia lorem finibus, laoreet volutpat quis
            suspendisse metus. Ultricies facilisi morbi parturient litora hendrerit lobortis, fringilla purus congue
            nisi cubilia ipsum, commodo ornare himenaeos fermentum ultrices. Adipiscing habitant viverra nibh nulla
            aliquam ultrices auctor, erat lacinia ridiculus malesuada scelerisque tempor ultricies, curae senectus sit
            faucibus dapibus tincidunt. Congue tincidunt sodales aptent eleifend dis duis integer quis id semper tempor
            tellus, tortor platea porta cras ornare odio sagittis netus suscipit adipiscing metus. Inceptos at aliquet
            purus malesuada tempus, lobortis ac dui platea a facilisis, sem vestibulum potenti dignissim phasellus,
            etiam vel viverra fringilla. Fringilla mattis turpis magnis sociosqu curae ac, arcu magna scelerisque nibh
            dictumst dapibus montes, nisi primis eget faucibus vulputate. Porta parturient natoque mattis turpis
            molestie habitasse condimentum, fermentum porttitor urna ut nisl consectetur pharetra eu, venenatis id
            rutrum primis facilisi enim. Vehicula ultrices mollis suspendisse velit non, purus egestas class neque
            faucibus ipsum, mi vivamus arcu felis. Purus taciti laoreet dolor dis a orci platea quam inceptos nostra
            sapien, luctus porta habitasse ridiculus leo fusce natoque hendrerit ultrices. Dis mattis aptent massa
            semper sed commodo sociosqu est iaculis fusce, id nam dolor mi malesuada elit vivamus neque ridiculus orci,
            erat facilisi pharetra suscipit amet lobortis nisl interdum aenean. Vitae turpis commodo per condimentum
            feugiat lacus tempor et euismod a phasellus nibh, eros ipsum vel orci tincidunt venenatis dictum donec
            imperdiet erat montes. Fermentum adipiscing integer taciti hendrerit et scelerisque torquent maximus velit
            ut iaculis, tortor habitant mollis enim facilisi donec sodales semper nec elementum. Iaculis suspendisse
            aenean torquent nisi facilisis tincidunt pharetra montes tristique, quam sit nascetur commodo diam dictumst
            faucibus nunc, enim metus pellentesque maximus finibus praesent accumsan hac. Ac curabitur ante sem massa
            per ut lobortis senectus quam venenatis elit efficitur, vestibulum turpis quis praesent laoreet fames metus
            ligula cras porta sapien. Nisi taciti sagittis iaculis volutpat primis mattis curabitur ad laoreet tincidunt
            elementum, posuere curae facilisis et malesuada cursus enim maximus aliquet. Dapibus malesuada rutrum
            ridiculus dui ultricies eleifend, rhoncus consectetur ac sit posuere, primis aliquet vulputate augue magnis.
            Blandit per porttitor quam purus vivamus orci, sit potenti hac ante integer ornare, pellentesque sociosqu
            consectetur suspendisse posuere elementum, nisl tincidunt ultricies in lectus. Suscipit integer morbi nunc
            elit scelerisque primis ipsum proin lobortis nullam, posuere fringilla id aliquet dui mattis libero non quis
            convallis urna, ullamcorper aenean mollis ligula blandit vestibulum nostra ridiculus volutpat. Himenaeos
            neque dis etiam tellus dolor cubilia mattis bibendum mi cursus sodales eu, semper nam rhoncus congue magna
            nascetur purus ultrices dignissim amet. Varius netus platea egestas volutpat finibus augue elementum,
            imperdiet facilisis pretium sociosqu justo ornare velit, ultrices pharetra montes maecenas tempor iaculis.
            Ultrices at etiam ac pellentesque auctor ut, purus ultricies nulla dis hendrerit primis, inceptos ornare ad
            praesent fringilla. Aliquet aenean id massa fames dapibus tincidunt pellentesque venenatis fermentum,
            rhoncus magna cras eget morbi mus nascetur natoque, quis luctus torquent augue urna tempus interdum dictum.
            Vivamus libero facilisis risus netus platea ligula aptent nostra leo finibus habitant, per quisque suscipit
            lorem penatibus vel duis venenatis dictumst a, eget lacinia augue sollicitudin semper pretium maximus nisi
            diam montes. Dignissim hac ornare elit turpis posuere venenatis integer, dis himenaeos quam ullamcorper
            fermentum vivamus sociosqu, ante nunc aliquam purus fames nam. Sollicitudin orci fames rutrum diam
            adipiscing, arcu ex conubia blandit malesuada purus, fusce quisque rhoncus sed. Volutpat magna nibh id dolor
            auctor a cubilia, metus risus lacinia et accumsan turpis nam viverra, ornare ut varius ad litora torquent.
            Venenatis fringilla faucibus integer parturient dis fames scelerisque tempus pretium mattis fermentum felis
            dolor, viverra ac taciti vehicula conubia eu class senectus tellus sem mi. Vivamus mi class hac venenatis
            lacus sed dis, netus ad leo lobortis volutpat facilisis condimentum, litora elit tortor tempor rutrum
            eleifend. Nam scelerisque aenean hac sociosqu fames rutrum taciti mollis eros tempus risus, tortor quam
            tellus vivamus cras phasellus diam tincidunt nec hendrerit, finibus gravida nullam ridiculus at volutpat
            felis netus odio fringilla. Hendrerit magnis duis neque maximus aliquet phasellus hac magna curae orci
            finibus, eleifend pulvinar dapibus sed sollicitudin porttitor pharetra fusce sapien. Inceptos augue tempus
            gravida dapibus platea fermentum pellentesque risus velit, lacus tristique magna purus suscipit mus ipsum in
            aliquam, quam facilisis vel sociosqu mi elementum montes euismod. Eu cras metus inceptos magnis pellentesque
            non lobortis finibus arcu facilisi tincidunt velit tempus, nibh dis class proin lectus feugiat per conubia
            penatibus bibendum fringilla. Nec efficitur est vehicula condimentum cursus maecenas tempor convallis, sit
            leo tristique ullamcorper pulvinar lacus in. Parturient ut sit nam et volutpat pulvinar dapibus, iaculis
            neque magna lectus himenaeos eu pellentesque, dolor finibus tellus ipsum dignissim nisi. Quis lectus nibh
            rutrum neque phasellus per, aptent auctor quam magnis platea scelerisque vehicula, turpis ut etiam
            adipiscing fermentum. Dictumst proin varius mauris metus nisi himenaeos nisl, lobortis ultricies malesuada
            vulputate porta fusce cubilia facilisis, mollis mi hendrerit erat sociosqu ex. Condimentum nascetur fusce
            habitant non per montes orci elit, sed eu aliquet consectetur ipsum mattis elementum ornare, duis inceptos
            neque magnis facilisis auctor efficitur. Feugiat semper vehicula nulla eleifend sociosqu lorem diam sem non
            nisl, ad facilisis libero varius curabitur malesuada in blandit elit inceptos, porttitor fusce conubia ex
            habitasse aliquam ipsum tempor sagittis. Imperdiet est magna vitae ullamcorper per consectetur sit eget eu,
            vivamus etiam nullam suspendisse risus pellentesque nibh hac donec, ultrices viverra cras sem felis tempor
            vestibulum neque. Dictumst nascetur nec purus eu nullam conubia sodales ullamcorper urna massa blandit non
            malesuada ad, morbi porta interdum sagittis maximus pellentesque tristique libero quis semper a volutpat
            sit. Magna hac lacinia lacus class nulla torquent, elementum eu augue mi nam risus, a orci ligula vestibulum
            curae. Lectus hendrerit felis quisque velit conubia dapibus augue nunc imperdiet praesent dictumst vehicula
            vivamus, nostra aptent penatibus inceptos mus metus nibh donec mollis molestie sodales id. Et varius orci
            accumsan a netus risus gravida eget dolor habitant, sapien platea cras ex adipiscing hac ac felis phasellus,
            euismod blandit semper morbi rhoncus torquent suspendisse porttitor tellus. Aenean porttitor ut viverra
            imperdiet feugiat vehicula, rutrum condimentum erat varius vel, vestibulum donec amet efficitur dictum.
            Commodo non magnis netus imperdiet, in nullam primis lobortis hac, ultricies justo enim. Praesent nec
            inceptos ultricies sodales consequat fringilla class venenatis augue faucibus, metus in primis per euismod
            habitasse aliquet magna. In montes porttitor praesent egestas sollicitudin ridiculus semper senectus donec,
            sem penatibus sociosqu lobortis conubia condimentum aliquam facilisis, fames nullam torquent ipsum litora
            proin tristique duis. Dictum a dolor adipiscing vestibulum condimentum facilisis taciti euismod mollis in,
            efficitur auctor pharetra ut tortor rhoncus malesuada purus arcu scelerisque, nullam vulputate vel donec
            justo maecenas suspendisse pretium aptent. Conubia risus cubilia neque ut ac ridiculus facilisi sem, eget
            donec tempus quis ipsum dapibus nam scelerisque, amet rhoncus magnis quam dignissim litora mi. In sit luctus
            varius nostra nulla ornare platea, parturient ipsum facilisis justo duis mattis viverra phasellus, dictumst
            quisque quam lacus cursus finibus. Proin ligula potenti magna nullam elementum gravida nam, fusce ante
            torquent finibus litora tortor imperdiet eget, iaculis pharetra habitasse ac inceptos euismod. Ornare
            venenatis dignissim mi porttitor fringilla duis, magna lectus inceptos nostra massa. Nostra pharetra cursus
            consectetur donec pulvinar dictum malesuada convallis fermentum pellentesque nascetur maecenas orci purus
            fusce natoque, quis augue sociosqu fringilla dictumst duis scelerisque cubilia sem arcu et congue taciti
            montes. Integer elit commodo mollis tempus nibh morbi torquent nisl dolor, vestibulum eget facilisi eu
            lectus ultrices dapibus aliquam, platea interdum nam suspendisse lacinia finibus eros fermentum.
          </p>
        </ng-template>
      </ngx-step>
      <ngx-step label="Conditions">
        <ng-template ngxStepContent>
          <p>Some nested stepper</p>
          <ngx-stepper largeFormatDialogSubStepper [readonly]="false" [(active)]="nestedStepIndex">
            <ngx-step label="Initial Selections">
              <ng-template ngxStepContent> Step One </ng-template>
            </ngx-step>
            <ngx-step label="Conditions">
              <ng-template ngxStepContent> Step Two </ng-template>
            </ngx-step>
            <ngx-step label="Outputs">
              <ng-template ngxStepContent> Step Three </ng-template>
            </ngx-step>
            <ngx-step label="Finish">
              <ng-template ngxStepContent> Step Four </ng-template>
            </ngx-step>
          </ngx-stepper>
        </ng-template>
      </ngx-step>
      <ngx-step label="Outputs">
        <ng-template ngxStepContent> Step Three </ng-template>
      </ngx-step>
      <ngx-step label="Finish">
        <ng-template ngxStepContent> Step Four </ng-template>
      </ngx-step>
    </ngx-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NestedStepperComponent {
  @Input() stepIndex: number;
  nestedStepIndex = 0;
}
