### 0.0.1-0 (2021-07-17)


### Features

* **alert:** add Alert 23c8089
* **animations:** add animations d486225
* **appearance:** add AppearanceController d655093
* **assets:** add assets 84147e8
* **autofocus:** add AutofocusController 0fc6075
* **autosize-input:** add autosize input 4614600
* **autosize-input:** exportAs 2462446
* **autosize-input:** remove autosize input directive 31c15a4
* **autosize:** add AutosizeController 6629ad8
* **button:** add Button 8cff264
* **button:** exportAs be5f6fd
* **button:** expose enums e1105ed
* **calendar:** add Calendar 7e4d39a
* **camel-to-snake:** add CamelToSnake 3e232a1
* **card:** add Card 903cd74
* **checkbox:** add Checkbox 6afc083
* **code-editor:** add CodeEditor 42173c6
* **common:** add common ae38d33
* **common:** add Controller abstract and createControllerFactory b18220d
* **common:** add setter callback to Input decorators dfed5af
* **common:** allow controllerFactory to return a new instance if null e7c9f87
* **copy-to-clipboard:** add copy to clipboard directive 6276bcc
* **copy-to-clipboard:** exportAs 4555313
* **date-time:** add DateTime 7036bbf
* **decamelize:** add Decamelize 313bd2d
* **dialog:** add Dialog 0f692d2
* **docs:** add docs application e7416a4
* **drawer:** add Drawer 12603cf
* **dropdown:** add Dropdown 66cebea
* **dropzone:** add Dropzone e0027e0
* **file-button:** add FileButton 72ec184
* **filter-by:** add FilterBy e1fe5e4
* **hotkeys:** add Hotkeys 60d6e8f
* **icon:** add Icon 5813fc8
* init ngx-ui 5aacebe
* **injection:** add Injection services 1e4e881
* **input-attribute:** add InputAttributeController 3408afe
* **input-attribute:** add label and placeholder 199569a
* **input-autosize:** add InputAutosizeController cc8b11a
* **input-autosize:** rename InputAutosizeControler dc0e79c
* **input:** add InputComponent c49786b
* **intersection-observer:** add IntersectionObserver 9e670a8
* **intersection-observer:** exportAs ac739f8
* **json-editor:** add JsonEditor 77eccd7
* **json-tree:** add JsonTree 34282b6
* **large-format-dialog:** add LFD 7ad23cf
* **loading:** add Loading b863ad5
* **long-press-button:** add LongPressButton 58a1bbc
* **long-press:** add longpress 630a9bf
* **long-press:** exportAs f67fa0d
* **marginless:** add MarginlessController f7e30b9
* **nag:** add Nag d7f2ac2
* **nav-menu:** add NavMenu a9a0516
* **navbar:** add Navbar ca50aee
* **ngx-doc:** init ngx-doc 2a5a1f2
* **ngx-doc:** structure is kind of done 16d24fe
* **ngx-doc:** wip ea93229
* **ngx-doc:** wip basic structure 90ad4b8
* **notification:** add Notification 57db02e
* **overlay:** add Overlay 26eeff6
* **plus-menu:** add PlusMenu 87ba27c
* **progress-spinner:** add ProgressSpinner 9401627
* **radio-button:** add RadioButton 87d1347
* **resize-observer:** add resize observer 2e2e44e
* **resize-observer:** exportAs 92715d1
* **section:** add Section 1b2cbf8
* **select:** add Select 5b3a344
* **size:** add SizeController 3012c95
* **slider:** add Slider 49377be
* **split:** add Split 0550ce8
* **stepper:** add Stepper 7b4a904
* **styles:** add color error 7293d3e
* **styles:** add styles 647bab7
* **styles:** expose themes 8968a51
* **tabs:** add Tabs 81acdd6
* **time-zone:** add TimeZone d06de7d
* **tip:** add Tip d3611f5
* **toggle:** add Toggle f442223
* **toolbar:** add Toolbar de5dfad
* **tooltip:** add Tooltip 5c50bee
* **tree:** add Tree 9ae15d5
* **typings:** add InputType enum e66c79a
* **typings:** add typings 1f7f0ad
* **utils:** add utils 6554a40


### Bug Fixes

* adjust DI of controllers 7b71728
* **button:** comment out finally() usage d446a1d
* **button:** remove components button style duplicate e15ac8a
* **button:** update Input name 6e2d1a8
* **calendar:** remove comment aabc60d
* **camel-to-snake:** make value optional aa20d3a
* **camel-to-snake:** remove CommonModule 4f69997
* **card:** typo on directive selector bc595fa
* **checkbox:** revert to HTML file 378ee6a
* **checkbox:** use inline template and inline styles to pass build dc8e791
* **code-editor:** adjust styles d97ba66
* **date-time:** use inputAttribute label 3a8ec26
* **hotkeys:** add HTML for Hotkeys 22ab6a3
* **icon:** add anothe selector 0e41f10
* **icon:** make IconRegistryService providedIn root 3757c40
* **input-attribute:** move hint and minWidth to controller 28bf96f
* **input:** adjust Input with InputAttributeController change f487764
* **input:** use inputAttribute label 94af139
* **intersection-observer:** adjust 276ed3c
* **large-format-dialog:** adjust sub tabs/stepper directive selector fda8629
* **ngx-doc:** add blockquote style and adjust markdown component 19ad17f
* **ngx-doc:** remove LoadingModule from DocNavigation 26945f6
* **ngx-ui:** fix package name in packagejson 04474f6
* **ngx-ui:** revert reexport c818010
* **styles:** readjust styles to 2/4/8/16 base 84150e2
* **styles:** use hex values to define all CSS vars 7180b43
* **tooltip:** revert to HTML b37a39b
* **tooltip:** use inline template and inline styles to pass build a9d9845
* **typings:** move AlertStyle and AlertType enum to Alert e6b9ca3
* update entry point a04754f


### Refactor

* **appearance:** adjust type 6d5c11d
* **autosize-input:** remove CommonModule e8c2d70
* **copy-to-clipboard:** remove CommonModule e4e8534
* **long-press:** remove CommonModule 7dd6f7a
* **marginless:** adjust 9d2d7ad
* **resize-observer:** use ngZone bbebde0
* **size:** adjust type 8edbe4c
* **tooltip:** move tooltip content component to dir 4ee57f1


### Documentations

* add Calendar to migration notes 37a174e
* add CamelToSnake 469fc2c
* add Card and Checkbox to migration notes 02c8194
* add FileButton to migration notes 133153c
* add more details to migration notes 5288aab
* add ResizeObserver to BREAKING CHANGES fece6f6
* add typings to raw loading files 0305e9a
* add Typography 45b9b45
* adjust input example 3aca0a8
* **docs:** add CalendarModule f55dbd9
* **docs:** add FileButtonModule to docs 770e554
* **docs:** test card 9978c5b
* test InputComponent d77ec55
* update migration doc f1b8a06
* update migration note on ButtonComponent 9b078c1
* update migration notes 06372ba
* update migration notes 0317457
* update MIGRATION NOTES and add CONTRIBUTING 1c139f6
* wip using ngx-doc f5b80dc

