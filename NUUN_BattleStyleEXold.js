/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js

 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張設定用
 * @author NUUN
 * @orderBefore NUUN_BattleStyleEX_Base
 * @version 1.6.4
 * 
 * @help
 * このプラグインはレイアウト設定用のプラグインです。
 * バトルスタイルを変更するには「NUUN_BattleStyleEX_Base」をこのプラグインよりも下に配置してください。
 * 
 * 
 * 戦闘レイアウト及び一部仕様を変更、拡張します。
 * 戦闘バトルスタイルをMZ標準の仕様以外にMV、XPスタイルに変更することが出来ます。
 * いずれもフロントビューでのアクター側にエフェクトが表示可能です。
 * ステート、バフの付与時、解除時にポップアップします。
 * （エフェクト、ポップアップはフロントビューの場合はフロントビューエフェクト表示がtrueのときのみ表示されます）
 * またバトルレイアウトは自由に配置可能です。（現在XPスタイルのみ対応しています）
 * 各アクターステータスの名前、ステート、HP、MP、TP、TPBの位置やゲージの長さを変更できます。
 * 
 * 
 * アクター画像はデフォルトで表示するアクター画像が指定されていない場合、標準の顔グラフィックが表示されます。
 * また条件によりアクターグラフィック、顔グラが変化します。
 * 戦闘不能、被ダメージ時、溺死、勝利、詠唱時、攻撃時、アイテム使用時、回復スキル使用時、回復時、ステートにかかっている時に変化されることが出来ます。
 * 戦闘不能は画像指定しない場合はアクター画像が消える設定になっていますので消さない設定にするには、戦闘不能時の画像をデフォルト画像と同じ、デフォルトインデックスと同じにするか「戦闘不能時アクター画像表示」をfalseに設定してください。
 * 「立ち絵表示EX」NUUN_ActorPictureを導入することで状況により画像を設定している画像設定リストを変更することが出来ます。
 * 特定のスイッチがONならばその条件に合う条件の画像設定リストが設定されます。
 * スイッチ、武器、防具、ステート、条件式に対応しています。
 * 
 * 
 * 顔グラフィックが８を超える場合は、複数の顔グラフィック画像を１つのファイルに結合してください。
 * （データベースのアクター設定の顔グラフィックでも反映されます）
 * ＊＊＊＊　元の顔グラフィック画像
 * ＊＊＊＊
 *    +
 * ＊＊＊＊　追加の顔グラフィック画像
 * ＊＊＊＊
 *    +
 * 顔グラのインデックス番号は左上から順に0,1,2,3となっています。
 * 
 * 
 * 立ち絵表示EXで設定した立ち絵の座標設定は立ち絵表示EX用画像設定で設定します。
 * 立ち絵表示EX用画像設定でアクターの設定をしない場合、立ち絵表示EXの設定は適用されませんので必ず
 * 立ち絵表示EX用画像設定で各アクターの設定をしてください。
 * 
 * 
 * 各ステータスの位置を変更したい場合は、各項目の「〇〇の座標変更」をtureにしてください。
 * 
 * アクターステータスが２行以上になる場合で顔グラフィックを表示している場合は「顔グラフィックの座標変更」をtrueにしてください。
 * falseのままだと画像がつぶされて表示されなくなります。座標位置は基本いじらなくても表示されます。
 * 
 * アクターステータスのサイズを確認したい場合は、テスト戦闘を行い「DevTools」で確認できます。
 * 背景画像はアクターウィンドウ、アクターステータス背景ともにimg/systemに配置してください。
 * 
 * アクター画像のダメージ時のシェイク、行動時のズームを行いたくない場合は「シェイクフレーム」「行動時エフェクトフレーム」の値を0に
 * 設定してください。
 * 
 * アクターコマンド
 * 最大表示コマンド行数を最低表示コマンド行数より大きい数値に設定することでコマンドの表示が可変になります。表示できる数は最大表示コマンドの行数まで表示できます。
 * 
 * エネミーのメモ欄
 * <AttackAnimation:11>
 * エネミーの通常攻撃時、11番のアニメーションが再生されます。
 * 
 * ステートのメモ欄
 * アクター画像変化機能
 * <ChangeImgId:1>
 * 被ステート時に顔グラまたは、グラフィック画像がID１の画像に変化します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/17 Ver 1.6.4
 * 立ち絵、顔グラ変化条件に残りHPを追加。
 * 2021/12/11 Ver 1.6.3
 * 立ち絵表示EX用の設定項目を追加。
 * 2021/12/4 Ver 1.6.2
 * メッセージウィンドウ表示時のアクターステータスの不透明度を手動設定に変更。
 * メッセージウィンドウ表示時にアクターステータスの表示非表示にする機能を追加。
 * 2021/10/3 Ver 1.6.1
 * ステータスとアクター画像の間に背景画像を表示できる機能を追加。
 * 2021/9/29 Ver 1.6.0
 * アクター画像の表示範囲を指定できる機能を追加。
 * 2021/9/19 Ver 1.5.3
 * アクター側のアニメーションを反転しない機能を追加。
 * 2021/9/11 Ver 1.5.2
 * アクターコマンドを全てのモードにおいて可変に表示できるよう変更。
 * 2021/7/17 Ver 1.5.1
 * ポップアップ機能の個別プラグイン化により既に設定済みの方用に互換機能を追加。
 * 2021/7/14 Ver 1.5.0
 * アクターコマンドモードにSVアクターの上、左、右に表示させる機能を追加。
 * 2021/7/7 Ver 1.4.3
 * 対象選択時にヘルプウィンドウを表示したままにする機能を追加。
 * 2021/6/26 Ver 1.4.2
 * 画像指定の設定方法を変更。
 * アイテム、スキル、モンスター対象選択ウィンドウ、ヘルプウィンドウのウィンドウを表示しない機能及び背景画像を設定できる機能を追加。
 * 2021/6/21 Ver 1.4.1
 * 一部修正。
 * 2021/6/20 Ver 1.4.0
 * アクターのダメージ時にアクター画像をシェイクする機能、行動時にズームする機能を追加しました。
 * パーティコマンド、アクターコマンドの背景を非表示にする機能を追加。
 * 2021/6/6 Ver 1.3.1
 * アクター画像に回復をしたときの画像を追加。
 * 2021/6/5 Ver 1.3.0
 * アクター画像の変化に攻撃、スキル使用時、魔法使用時、アイテム使用時を追加。
 * アクター画像のプラグインパラメータを整理。
 * 2021/4/11 Ver 1.2.1
 * ポップアップの表示間隔、解除時の不透明度を指定できる機能を追加。
 * 2021/4/5 Ver 1.2.0
 * ステート、バフをポップアップする機能を追加。
 * 2021/4/4 Ver 1.1.0
 * バトルレイアウトをデフォルト以外にMV、XPスタイルを選択できる機能を追加。
 * 顔グラを表示させない機能を追加。
 * 一部のプラグインパラメータのデフォルトの設定方法を変更。
 * 2021/3/27 Ver 1.0.4
 * ステート画像をウィンドウ範囲外でも表示できるよ機能を追加。
 * 2021/3/22 Ver 1.0.3
 * プラグインコマンドにアクターウィンドウを非表示にする機能を追加。
 * プラグインコマンドにアクターウィンドウを不透明化にする機能を追加。
 * モンスターの出現メッセージをカットする機能を追加。
 * 2021/1/18 Ver 1.0.2
 * プラグインパラメータが正常に設定できない問題を修正。
 * 2021/1/17 Ver 1.0.1
 * ゲージの縦幅を指定できる機能を追加。
 * 2021/1/17 Ver 1.0.0
 * ベースプラグインとレイアウト設定用のプラグインを別々に分割。
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param StyleMode
 * @text バトルレイアウトモード
 * @desc バトルレイアウトのモードを指定します。
 * @type select
 * @option デフォルト
 * @value "Default"
 * @option MVスタイル
 * @value "MVStyle"
 * @option XPスタイル
 * @value "XPStyle"
 * @default "XPStyle"
 * @parent Setting
 * 
 * @param AppearWindowVisible
 * @desc モンスターが出現したときのメッセージを表示しません。
 * @text モンスター出現メッセージ非表示
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param MessageWindowPosition
 * @text エネミー出現、リザルト、敗北、逃走メッセージ等上部表示
 * @desc エネミー出現、リザルト、敗北、逃走メッセージ等を画面上側に表示させます。
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param MessageWindowVisibleMode
 * @text メッセージウィンドウ表示字アクターステータス画面非表示
 * @desc メッセージウィンドウ表示時にアクターステータス画面を非表示にします。
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param Window
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param ActorStatusWindowVisibleSetting
 * @text アクターステータスウィンドウ表示設定
 * @parent Window
 * 
 * @param WindowShow
 * @desc アクターウィンドウを表示する。
 * @text アクターウィンドウ表示
 * @type boolean
 * @default
 * @parent ActorStatusWindowVisibleSetting
 * 
 * @param WindowFrameShow
 * @desc アクターウィンドウ枠を表示する。
 * @text アクターウィンドウ枠表示
 * @type boolean
 * @default
 * @parent ActorStatusWindowVisibleSetting
 * 
 * @param cursorBackShow
 * @desc アクター選択背景を表示する。
 * @text アクター選択背景表示
 * @type boolean
 * @default true
 * @parent ActorStatusWindowVisibleSetting
 * 
 * @param windowBackground
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent ActorStatusWindowVisibleSetting
 * 
 * @param PartyCommandWindowVisibleSetting
 * @text パーティコマンドウィンドウ表示設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param PartyCommandWindowShow
 * @desc パーティコマンドウィンドウを表示する。
 * @text パーティコマンドウィンドウ表示
 * @type boolean
 * @default true
 * @parent PartyCommandWindowVisibleSetting
 * 
 * @param PartyCommandCursorBackShow
 * @desc パーティウィンドウの選択背景を表示する。
 * @text パーティウィンドウ選択背景表示
 * @type boolean
 * @default true
 * @parent PartyCommandWindowVisibleSetting
 * 
 * @param PartyCommandBackground
 * @desc パーティコマンドの背景画像ウィンドウを指定する。（未実装）
 * @text パーティコマンド背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent PartyCommandWindowVisibleSetting
 * 
 * @param PartyCommandBackgroundAnchorMode
 * @text パーティコマンド背景画像の基準位置
 * @desc パーティコマンド背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 1
 * @parent PartyCommandWindowVisibleSetting
 * 
 * @param PartyCommandBackground_X
 * @desc パーティコマンドの背景画像のX座標（相対座標）を調整します。
 * @text 背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent PartyCommandWindowVisibleSetting
 * 
 * @param PartyCommandBackground_Y
 * @desc パーティコマンドの背景画像のY座標（相対座標）を調整します。
 * @text 背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent PartyCommandWindowVisibleSetting
 * 
 * @param ActorCommandWindowVisibleSetting
 * @text アクターコマンドウィンドウ表示設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param ActorCommandWindowShow
 * @desc アクターコマンドウィンドウを表示する。
 * @text アクターコマンドウィンドウ表示
 * @type boolean
 * @default true
 * @parent ActorCommandWindowVisibleSetting
 * 
 * @param ActorCommandCursorBackShow
 * @desc アクターウィンドウの選択背景を表示する。
 * @text アクターウィンドウ選択背景表示
 * @type boolean
 * @default true
 * @parent ActorCommandWindowVisibleSetting
 * 
 * @param ActorCommandBackground
 * @desc アクターコマンドの背景画像ウィンドウを指定する。（未実装）
 * @text アクターコマンド背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent ActorCommandWindowVisibleSetting
 * 
 * @param ActorCommandBackgroundAnchorMode
 * @text アクターコマンド背景画像の基準位置
 * @desc アクターコマンド背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 1
 * @parent ActorCommandWindowVisibleSetting
 * 
 * @param ActorCommandBackground_X
 * @desc アクターコマンドの背景画像のX座標（相対座標）を調整します。
 * @text 背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorCommandWindowVisibleSetting
 * 
 * @param ActorCommandBackground_Y
 * @desc アクターコマンドの背景画像のY座標（相対座標）を調整します。
 * @text 背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorCommandWindowVisibleSetting
 * 
 * @param SelectWindowVisibleSetting
 * @text アイテムウィンドウ表示設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param HelpWindowSelectShow
 * @desc 対象選択時にヘルプウィンドウを表示する。
 * @text 対象選択時ヘルプウィンドウ表示
 * @type boolean
 * @default true
 * @parent SelectWindowVisibleSetting
 * 
 * @param SelectWindowShow
 * @desc アイテム、スキル、敵選択のウィンドウ画像を表示する。
 * @text アイテム、スキル、敵選択ウィンドウ表示
 * @type boolean
 * @default true
 * @parent SelectWindowVisibleSetting
 * 
 * @param SelectCursorBackShow
 * @desc アイテム、スキル、敵選択の選択背景を表示する。
 * @text アイテム、スキル、敵選択選択背景表示
 * @type boolean
 * @default true
 * @parent SelectWindowVisibleSetting
 * 
 * @param ItemWindowBackground
 * @desc アイテム背景画像ウィンドウを指定する。
 * @text アイテム背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent SelectWindowVisibleSetting
 * 
 * @param ItemBackgroundAnchorMode
 * @text アイテム背景画像の基準位置
 * @desc アイテム背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 1
 * @parent SelectWindowVisibleSetting
 * 
 * @param ItemBackground_X
 * @desc アイテムウィンドウの背景画像のX座標（相対座標）を調整します。
 * @text アイテムウィンドウ背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent SelectWindowVisibleSetting
 * 
 * @param ItemBackground_Y
 * @desc アイテムウィンドウの背景画像のY座標（相対座標）を調整します。
 * @text アイテムウィンドウ背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent SelectWindowVisibleSetting
 * 
 * @param SkillWindowBackground
 * @desc スキル背景画像ウィンドウを指定する。
 * @text スキル背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent SelectWindowVisibleSetting
 * 
 * @param SkillBackgroundAnchorMode
 * @text スキル背景画像の基準位置
 * @desc スキル背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 1
 * @parent SelectWindowVisibleSetting
 * 
 * @param SkillBackground_X
 * @desc スキルウィンドウの背景画像のX座標（相対座標）を調整します。
 * @text スキルウィンドウ背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent SelectWindowVisibleSetting
 * 
 * @param SkillBackground_Y
 * @desc スキルウィンドウの背景画像のY座標（相対座標）を調整します。
 * @text スキルウィンドウ背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent SelectWindowVisibleSetting
 * 
 * @param EnemyWindowBackground
 * @desc エネミー選択画面背景画像ウィンドウを指定する。
 * @text エネミー選択画面背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent SelectWindowVisibleSetting
 * 
 * @param EnemyBackgroundAnchorMode
 * @text エネミー選択画面背景画像の基準位置
 * @desc エネミー選択画面背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 1
 * @parent SelectWindowVisibleSetting
 * 
 * @param EnemyBackground_X
 * @desc エネミー選択画面の背景画像のX座標（相対座標）を調整します。
 * @text エネミー選択画面背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent SelectWindowVisibleSetting
 * 
 * @param EnemyBackground_Y
 * @desc エネミー選択画面の背景画像のY座標（相対座標）を調整します。
 * @text エネミー選択画面背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent SelectWindowVisibleSetting
 * 
 * @param HelpVisibleSetting
 * @text ヘルプウィンドウ表示設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param HelpWindowShow
 * @desc ヘルプウィンドウ画像を表示する。
 * @text ヘルプウィンドウ表示
 * @type boolean
 * @default true
 * @parent HelpVisibleSetting
 * 
 * @param HelpWindowBackground
 * @desc ヘルプウィンドウの背景画像ウィンドウを指定する。
 * @text ヘルプウィンドウ背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent HelpVisibleSetting
 * 
 * @param HelpBackgroundAnchorMode
 * @text ヘルプ背景画像の基準位置
 * @desc ヘルプ背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 0
 * @parent HelpVisibleSetting
 * 
 * @param HelpBackground_X
 * @desc ヘルプ選択画面の背景画像のX座標（相対座標）を調整します。
 * @text ヘルプ選択画面背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpVisibleSetting
 * 
 * @param HelpBackground_Y
 * @desc ヘルプ選択画面の背景画像のY座標（相対座標）を調整します。
 * @text ヘルプ選択画面背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpVisibleSetting
 * 
 * @param MessageWindowVisibleSetting
 * @text メッセージウィンドウ表示設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param MessageWindowShow
 * @desc メッセージウィンドウを表示する。
 * @text メッセージウィンドウ表示
 * @type boolean
 * @default true
 * @parent MessageWindowVisibleSetting
 * 
 * @param MessageWindowBackground
 * @desc メッセージウィンドウの背景画像ウィンドウを指定する。
 * @text メッセージウィンドウ背景画像ウィンドウ
 * @type file[]
 * @dir img/
 * @default []
 * @parent MessageWindowVisibleSetting
 * 
 * @param MessageBackgroundAnchorMode
 * @text メッセージ背景画像の基準位置
 * @desc メッセージ背景画像の基準位置。
 * @type select
 * @option 上基準
 * @value 0
 * @option 下基準
 * @value 1
 * @default 1
 * @parent MessageWindowVisibleSetting
 * 
 * @param MessageBackground_X
 * @desc メッセージ選択画面の背景画像のX座標（相対座標）を調整します。
 * @text メッセージ選択画面背景画像のX座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent MessageWindowVisibleSetting
 * 
 * @param MessageBackground_Y
 * @desc メッセージ選択画面の背景画像のY座標（相対座標）を調整します。
 * @text メッセージ選択画面背景画像のY座標調整（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent MessageWindowVisibleSetting
 * 
 * @param AtherVisibleSetting
 * @text その他ウィンドウ表示設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param SelectBackShow
 * @desc アクターの行動選択時に表示されるアクター背景を表示する。
 * @text アクター行動時背景表示
 * @type boolean
 * @default true
 * @parent AtherVisibleSetting
 * 
 * @param ActorSelectBackShow
 * @desc アクターの対象選択時に表示されるアクター背景を表示する。
 * @text アクターの対象選択時背景表示
 * @type boolean
 * @default true
 * @parent AtherVisibleSetting
 * 
 * @param WindowCoordinateSetting
 * @text ウィンドウ座標設定
 * @parent Window
 * @default ------------------------------
 * 
 * @param ActorStatusWindowOnPosition
 * @desc アクターウィンドウ全体の座標の変更を許可します。
 * @text アクターウィンドウ座標変更許可
 * @type boolean
 * @default false
 * @parent WindowCoordinateSetting
 * 
 * @param ActorStatusWindow_X
 * @desc アクターステータスウィンドウのX座標（絶対座標）を指定します。
 * @text ウィンドウのX座標（絶対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowCoordinateSetting
 * 
 * @param ActorStatusWindow_Y
 * @desc アクターステータスウィンドウのY座標（絶対座標）を指定します。
 * @text ウィンドウのY座標（絶対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowCoordinateSetting
 * 
 * @param ActorStatusWindow_Width
 * @desc アクターステータスウィンドウの横幅を指定します。
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent WindowCoordinateSetting
 * 
 * @param ActorStatusWindow_Height
 * @desc アクターステータスウィンドウの縦幅を指定します。
 * @text ウィンドウの縦幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent WindowCoordinateSetting
 * 
 * @param ActorStatusWindowCenter
 * @text ウィンドウ座標中央表示
 * @desc ウィンドウの座標を中央に表示させます。
 * @type boolean
 * @default true
 * @parent WindowCoordinateSetting
 * 
 * @param Opacity
 * @text 不透明度設定
 * @default ------------------------------
 * 
 * @param ActorWindowSelectOpacity
 * @desc エネミー、アイテム、スキル選択画面を表示している時のアクターウィンドウの不透明度
 * @text 選択時ウィンドウ不透明度
 * @type number
 * @default 100
 * @max 255
 * @min 0
 * @parent Opacity
 * 
 * @param SkillWindowOpacity
 * @text スキル画面不透明度無効
 * @desc スキルウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param ItemWindowOpacity
 * @text アイテム画面不透明度無効
 * @desc アイテムウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param EnemyWindowOpacity
 * @text エネミー選択画面不透明度無効
 * @desc エネミー選択ウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param MessageWindowOpacity
 * @text メッセージウィンドウ不透明度無効
 * @desc メッセージウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param PartyCommand
 * @text パーティコマンド設定
 * @default ------------------------------
 * 
 * @param Default_PartyCommand
 * @text デフォルト、MVスタイルモード設定
 * @parent PartyCommand
 * 
 * @param Default_PartyCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent Default_PartyCommand
 * 
 * @param XP_PartyCommand
 * @text XPスタイルモード設定
 * @parent PartyCommand
 * @default ------------------------------
 * 
 * @param PartyCommandPosition
 * @text パーティコマンドの表示位置
 * @desc パーティコマンドの表示位置を指定します。
 * @type select
 * @option 上部
 * @value 0
 * @option 中間
 * @value 1
 * @option アクターステータスウィンドウの上
 * @value 2
 * @desc エネミーのNo表示
 * @default 0
 * @parent XP_PartyCommand
 * 
 * @param PartyCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent XP_PartyCommand
 * 
 * @param PartyCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent XP_PartyCommand
 * 
 * @param PartyCommandCenter
 * @text コマンド中央表示
 * @desc コマンドを中央に表示させます。
 * @type boolean
 * @default true
 * @parent XP_PartyCommand
 * 
 * @param PartyCommand_X
 * @desc コマンドのX座標。
 * @text コマンドX座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent XP_PartyCommand
 * 
 * @param PartyCommand_Y
 * @desc コマンドのY座標。
 * @text コマンドY座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent XP_PartyCommand
 * 
 * @param PartyCommand_Width
 * @desc コマンドの横幅。
 * @text コマンド横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent XP_PartyCommand
 * 
 * @param ActorCommand
 * @text アクターコマンド設定
 * 
 * @param ActorCommandMinRow
 * @desc 表示する最低コマンド行数。
 * @text 最低表示コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ActorCommand
 * 
 * @param ActorCommandMaxRow
 * @desc 表示する最大コマンド行数。
 * @text 表示最大コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ActorCommand
 * 
 * @param ActorCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent ActorCommand
 * 
 * @param XP_ActorCommand
 * @text XPスタイルモード設定
 * @parent ActorCommand
 * 
 * @param ActorCommandMode
 * @text アクターコマンドの表示方法
 * @desc アクターコマンドの表示方法を選択します。
 * @type select
 * @option ステータスウィンドウの各アクターの上
 * @value 0
 * @option 上部
 * @value 1
 * @option 中間
 * @value 2
 * @option アクターウィンドウの上
 * @value 3
 * @option 各SVアクターの上（SV推奨）
 * @value 4
 * @option 各SVアクターの左（SV推奨）
 * @value 5
 * @option 各SVアクターの右（SV推奨）
 * @value 6
 * @default 0
 * @parent XP_ActorCommand
 * 
 * @param ActorCommandCenter
 * @text コマンド中央表示
 * @desc コマンドを中央に表示させます。
 * @type boolean
 * @default true
 * @parent XP_ActorCommand
 * 
 * @param ActorCommand_X
 * @desc コマンドのX座標。
 * @text コマンドX座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent XP_ActorCommand
 * 
 * @param ActorCommand_Y
 * @desc コマンドのY座標。
 * @text コマンドY座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent XP_ActorCommand
 * 
 * @param ActorCommand_Width
 * @desc コマンドの横幅。
 * @text コマンド横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent XP_ActorCommand
 * 
 * @param Effect
 * @text エフェクト設定
 * @default ------------------------------
 * 
 * @param ActorEffectShow
 * @desc フロントビューでもエフェクトを表示。
 * @text フロントビューエフェクト表示
 * @type boolean
 * @default true
 * @parent Effect
 * 
 * @param ActorEffect_X
 * @desc アニメーションエフェクトのX座標（相対座標）。
 * @text アニメーションエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent Effect
 * 
 * @param ActorEffect_Y
 * @desc アニメーションエフェクトのY座標（相対座標）。
 * @text アニメーションエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent Effect
 * 
 * @param ActorDamage_X
 * @desc ダメージエフェクトのX座標（アニメーションエフェクトからの相対座標）。
 * @text ダメージエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent Effect
 * 
 * @param ActorDamage_Y
 * @desc ダメージエフェクトのY座標（アニメーションエフェクトからの相対座標）。
 * @text ダメージエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent Effect
 * 
 * @param ActorFlash
 * @desc アクター対象選択時にアクター画像（顔グラ）点滅させます。
 * @text アクター対象選択時点滅
 * @type boolean
 * @default true
 * @parent Effect
 * 
 * @param ActorsMirror
 * @desc アクターのアニメーションを反転します。
 * @text アクターアニメーション反転
 * @type boolean
 * @default true
 * @parent Effect
 * 
 * 
 * @param ActorStatus
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorMaxCol
 * @desc 横に並べるアクター数。(MVスタイルは列数が１固定です)
 * @text 横アクター数
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent ActorStatus
 * 
 * @param ActorMaxRow
 * @desc 縦に並べるアクター数。
 * @text 縦アクター数
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent ActorStatus
 * 
 * @param ActorStatusMode
 * @text アクターステータス表示方法
 * @desc アクターステータスの表示方法を選択します。
 * @type select
 * @option 左寄り
 * @value 0
 * @option 中央
 * @value 1
 * @option 右寄り
 * @value 2
 * @default 1
 * @parent ActorStatus
 * 
 * @param GaugeWidth
 * @desc HP,MP,TPゲージの最大横幅を指定します。(ベースプラグインVer.2.5.7以降使用廃止)
 * @text ゲージ最大横幅
 * @type number
 * @default
 * @min 0
 * @max 999
 * @parent ActorStatus
 * 
 * @param actorBackground
 * @desc アクターの背景画像を指定します。
 * @text アクター背景画像
 * @type file[]
 * @default []
 * @dir img/
 * @parent ActorStatus
 * 
 * @param ActorFrontBackground
 * @desc ステータス画面背景画像を指定する。（アクターグラフィックとステータスの間に表示）
 * @text ステータス画面背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent ActorStatus
 * 
 * @param ActorsButlers
 * @text アクターの画像設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param ActorsButlerList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorsButlerList>[]
 * @parent ActorsButlers
 * 
 * @param ActorPictureData
 * @text 立ち絵表示EX用画像設定
 * @desc 立ち絵表示EXでのアクターの画像設定
 * @default []
 * @type struct<ActorPictureDataList>[]
 * @parent ActorsButlers
 * 
 * 
 * @param Img_SW
 * @desc 画像の表示横幅。
 * @text 画像表示横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorsButlers
 * 
 * @param Img_SH
 * @desc 画像の表示縦幅。
 * @text 画像表示横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorsButlers
 * 
 * @param damageImgFrame
 * @desc ダメージ、回復時の画像変化フレーム。
 * @text ダメージ、回復時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @max 9999
 * @parent ActorsButlers
 * 
 * @param imgDeathHide
 * @desc 戦闘不能になった場合、アクター画像（顔グラ）を非表示にします。
 * @text 戦闘不能時アクター画像非表示
 * @type boolean
 * @default true
 * @parent ActorsButlers
 * 
 * @param ActorNameChangePosition
 * @text アクター名位置設定（相対座標）
 * @desc 座標はアクターステータス(0, 0)からの相対座標です。
 * @parent ActorStatus
 * 
 * @param NameShow
 * @desc 名前を表示します。
 * @text 名前表示
 * @type boolean
 * @default true
 * @parent ActorNameChangePosition
 * 
 * @param NameChangePosition
 * @desc 名前の座標変更を許可する。
 * @text 名前の座標変更
 * @type boolean
 * @default false
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_X
 * @desc 名前のX座標を設定します。（デフォルト0）
 * @text 名前X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_Y
 * @desc 名前のY座標を設定します。（デフォルト88）
 * @text 名前Y座標
 * @type number
 * @default 88
 * @min -9999
 * @max 9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorImgChangePosition
 * @text アクターグラフィック位置設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param ActorFaceVisible
 * @desc 顔グラフィックを表示させます。
 * @text 顔グラフィック表示
 * @type boolean
 * @default
 * @parent ActorImgChangePosition
 * 
 * @param ActorImg_X
 * @desc 画像のオフセットX座標（基準位置からの相対座標となります）
 * @text 画像オフセットX座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorImg_Y
 * @desc 画像のオフセットY座標（基準位置からの相対座標となります）
 * @text 画像オフセットY座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFace_Width
 * @desc 顔グラフィックの横幅（デフォルト0, 0でX座標中心基準で表示できる範囲が表示されます）
 * @text 顔グラフィック横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFace_Height
 * @desc 顔グラフィックの縦幅（デフォルト98, 0でY座標中心基準で表示できる範囲が表示されます）
 * @text 顔グラフィック縦幅
 * @type number
 * @default 98
 * @min 0
 * @max 9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFeceChangePosition
 * @text 顔グラフィック位置設定
 * @parent ActorImgChangePosition
 * 
 * @param FaceChangePosition
 * @desc 顔グラフィックの座標変更を許可します。アクターのピクチャ設定がされてないアクターのみ適用されます。
 * @text 顔グラフィックの座標変更
 * @type boolean
 * @default false
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_X
 * @desc 顔グラフィックのX座標を設定します。
 * @text 顔グラフィックX座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_Y
 * @desc 顔グラフィックのY座標を設定します。
 * @text 顔グラフィックY座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorFeceChangePosition
 * 
 * @param ActorHPChangePosition
 * @text HP位置設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param HPGaugeWidth
 * @desc HPゲージの横幅を指定します。（デフォルト128）
 * @text HPゲージ横幅
 * @type number
 * @default
 * @min 0
 * @max 999
 * @parent ActorHPChangePosition
 * 
 * @param HPGaugeHeight
 * @desc HPゲージの縦幅を指定します。（デフォルト12）
 * @text HPゲージ縦幅
 * @type number
 * @default 
 * @min 0
 * @max 24
 * @parent ActorHPChangePosition
 * 
 * @param HPChangePosition
 * @desc HPの座標変更を許可します。
 * @text HPの座標変更
 * @type boolean
 * @default false
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_X
 * @desc HPのX座標を設定します。（デフォルト0）
 * @text HP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_Y
 * @desc HPのY座標を設定します。（デフォルト112）
 * @text HP_Y座標
 * @type number
 * @default 112
 * @min -9999
 * @max 9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorMPChangePosition
 * @text MP位置設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param MPGaugeWidth
 * @desc MPゲージの横幅を指定します。（デフォルト128）
 * @text MPゲージ横幅
 * @type number
 * @default
 * @min 0
 * @max 999
 * @parent ActorMPChangePosition
 * 
 * @param MPGaugeHeight
 * @desc MPゲージの縦幅を指定します。（デフォルト12）
 * @text MPゲージ縦幅
 * @type number
 * @default 
 * @min 0
 * @max 24
 * @parent ActorMPChangePosition
 * 
 * @param MPChangePosition
 * @desc MPの座標変更を許可します。
 * @text MPの座標変更
 * @type boolean
 * @default false
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_X
 * @desc MPのX座標を設定します。（デフォルト0）
 * @text MP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_Y
 * @desc MPのY座標を設定します。（デフォルト136）
 * @text MP_Y座標
 * @type number
 * @default 136
 * @max 9999
 * @parent ActorMPChangePosition
 * 
 * @param ActorTPChangePosition
 * @text TP位置設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param TPGaugeWidth
 * @desc TPゲージの横幅を指定します。（デフォルト128）
 * @text TPゲージ横幅
 * @type number
 * @default
 * @min 0
 * @max 999
 * @parent ActorTPChangePosition
 * 
 * @param TPGaugeHeight
 * @desc TPゲージの縦幅を指定します。（デフォルト12）
 * @text TPゲージ縦幅
 * @type number
 * @default 
 * @min 0
 * @max 24
 * @parent ActorTPChangePosition
 * 
 * @param TPChangePosition
 * @desc TPの座標変更を許可します。
 * @text TPの座標変更
 * @type boolean
 * @default false
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_X
 * @desc TPのX座標を設定します。（デフォルト0）
 * @text TP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_Y
 * @desc TPのY座標を設定します。（デフォルト160）
 * @text TP_Y座標
 * @type number
 * @default 160
 * @min -9999
 * @max 9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTPBChangePosition
 * @text TPB位置設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param TPBShow
 * @desc TPBゲージを表示します。
 * @text TPBゲージ表示
 * @type boolean
 * @default true
 * @parent ActorTPBChangePosition
 * 
 * @param TPBGaugeWidth
 * @desc TPBゲージの横幅を指定します。（デフォルト128）
 * @text TPBゲージ横幅
 * @type number
 * @default
 * @min 0
 * @max 999
 * @parent ActorTPBChangePosition
 * 
 * @param TPBGaugeHeight
 * @desc TPBゲージの縦幅を指定します。（デフォルト12）
 * @text TPBゲージ縦幅
 * @type number
 * @default 
 * @min 0
 * @max 24
 * @parent ActorTPBChangePosition
 * 
 * @param TPBChangePosition
 * @desc TPBの座標変更を許可します。
 * @text TPBの座標変更
 * @type boolean
 * @default false
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_X
 * @desc TPBのX座標を設定します。（デフォルト0）
 * @text TPB_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_Y
 * @desc TPBのY座標を設定します。（デフォルト88）
 * @text TPB_Y座標
 * @type number
 * @default 88
 * @min -9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorStateChangePosition
 * @text ステート位置設定
 * @parent ActorStatus
 * @default ------------------------------
 * 
 * @param StateChangePosition
 * @desc ステートの座標変更を許可します。
 * @text ステートの座標変更
 * @type boolean
 * @default false
 * @parent ActorStateChangePosition
 * 
 * @param StateVisible
 * @desc アイコンを表示させます。
 * @text アイコン表示
 * @type boolean
 * @default true
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_X
 * @desc ステートのX座標を設定します。（デフォルト4）
 * @text ステートX座標
 * @type number
 * @default 4
 * @min -9999
 * @max 9999
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_Y
 * @desc ステートのY座標を設定します。（デフォルト20）
 * @text ステートY座標
 * @type number
 * @default 20
 * @min -9999
 * @max 9999
 * @parent ActorStateChangePosition
 * 
 * @param OutsideWindowVisible
 * @desc アイコンの表示をウィンドウ枠外でも表示させます。(アクター画像の上に表示されます)
 * @text アイコンウィンドウ枠外表示
 * @type boolean
 * @default false
 * @parent ActorStateChangePosition
 * 
 * @param ActorEffect
 * @text アクターエフェクト設定
 * @default ------------------------------
 * 
 * @param ActorShakeFlame
 * @desc ダメージ時のシェイクフレーム。（デフォルト36）
 * @text シェイクフレーム
 * @type number
 * @default 36
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorShakePower
 * @desc ダメージ時のシェイクの大きさ。（デフォルト2）
 * @text シェイクの大きさ
 * @type number
 * @default 2
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorShakeSpeed
 * @desc ダメージ時のシェイクのスピード。（デフォルト20）
 * @text シェイクスピード
 * @type number
 * @default 20
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActionZoomDuration
 * @desc 行動時のエフェクトフレーム
 * @text 行動時エフェクトフレーム
 * @type number
 * @default 60
 * @min 0
 * @parent ActorEffect
 * 
 * 
 * @param PopUpSettings
 * @text 互換機能　ポップアップ設定(要NUUN_popUp)
 * @default ------------------------------
 * 
 * @param BattleStyleEXSettings
 * @desc バトルスタイル拡張の設定を有効にする。（OFFの場合はNUUN_popUpの設定が反映されます）
 * @text バトルスタイル拡張設定有効
 * @type boolean
 * @default false
 * @parent PopUpSettings
 * 
 * @param PopUpBuff
 * @text ポップアップバフ設定
 * @desc ポップアップするバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"1\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"2\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"3\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"4\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"5\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"6\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"7\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"10\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"11\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"12\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"13\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"14\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"15\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"16\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}","{\"StateType\":\"17\",\"PopUpStateName\":\"\",\"StatePopUpMode\":\"0\",\"PopUpStateColor\":\"0\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent PopUpSettings
 * 
 * @param StateColor
 * @desc 有利なポップアップするときのステート、バフの色
 * @text 有利ステート、バフ文字色
 * @type number
 * @default 0
 * @parent PopUpSettings
 * 
 * @param BatStateColor
 * @desc 不利なポップアップするときのステート、バフの色
 * @text 不利ステート、バフ文字色
 * @type number
 * @default 0
 * @parent PopUpSettings
 * 
 * @param PopUpReleaseOpacity
 * @desc 解除時の不透明度
 * @text 解除時不透明度
 * @type number
 * @default 128
 * @parent PopUpSettings
 * 
 * @param PopUpUpdate
 * @desc ポップアップを連続で表示するときの間隔
 * @text ポップアップ間隔
 * @type number
 * @default 30
 * @parent PopUpSettings
 * 
 */
/*~struct~actorsButlerList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * 
 * @param DefaultSetting
 * @text デフォルト画像
 * @default ------------------------------
 * 
 * @param defaultImg
 * @text デフォルト画像
 * @desc デフォルトの画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent DefaultSetting
 * 
 * @param defaultFaceIndex
 * @desc デフォルトのインデックス番号。
 * @text デフォルトインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DefaultSetting
 * 
 * @param DeathSetting
 * @text 戦闘不能時画像
 * @default ------------------------------
 * 
 * @param deathImg
 * @text 戦闘不能画像
 * @desc 戦闘不能になった時の画像を表示します。指定しない場合は戦闘不能時に画像が透明になります。
 * @type file
 * @dir img/pictures
 * @parent DeathSetting
 * 
 * @param deathFaceIndex
 * @desc 戦闘不能時のインデックス番号。
 * @text 戦闘不能時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DeathSetting
 * 
 * @param DamageSetting
 * @text ダメージ時画像
 * @default ------------------------------
 * 
 * @param damageImg
 * @text ダメージ時画像
 * @desc ダメージを受けた時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent DamageSetting
 * 
 * @param damageFaceIndex
 * @desc ダメージ時のインデックス番号。
 * @text ダメージ時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DamageSetting
 * 
 * @param recoveryDamageImg
 * @text 回復時画像
 * @desc 回復した時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent DamageSetting
 * 
 * @param recoveryDamageFaceIndex
 * @desc 回復時のインデックス番号。
 * @text 回復した時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DamageSetting
 * 
 * @param DyingSetting
 * @text 瀕死時画像
 * @default ------------------------------
 * 
 * @param dyingImg
 * @text 瀕死時画像
 * @desc 瀕死の時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent DyingSetting
 * 
 * @param dyingFaceIndex
 * @desc 瀕死時のインデックス番号。
 * @text 瀕死時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DyingSetting
 * 
 * @param VictorySetting
 * @text 勝利時画像
 * @default ------------------------------
 * 
 * @param victoryImg
 * @text 勝利時画像
 * @desc 勝利時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent VictorySetting
 * 
 * @param victoryFaceIndex
 * @desc 勝利時のインデックス番号。
 * @text 勝利時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent VictorySetting
 * 
 * @param ChantSetting
 * @text 詠唱時画像
 * @default ------------------------------
 * 
 * @param chantImg
 * @text 詠唱時画像
 * @desc 詠唱時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ChantSetting
 * 
 * @param chantFaceIndex
 * @desc 詠唱時のインデックス番号。
 * @text 詠唱時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent ChantSetting
 * 
 * @param AttackSetting
 * @text 攻撃時画像
 * @default ------------------------------
 * 
 * @param attackImg
 * @text 攻撃、スキル使用時画像
 * @desc 攻撃、スキル使用時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent AttackSetting
 * 
 * @param itemImg
 * @text アイテム使用時画像
 * @desc アイテム使用時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent AttackSetting
 * 
 * @param recoveryImg
 * @text 回復スキル使用時画像
 * @desc 回復スキル使用時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent AttackSetting
 * 
 * @param attackFaceIndex
 * @desc 攻撃、スキル使用時のインデックス番号。
 * @text 攻撃、スキル使用時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent AttackSetting
 * 
 * @param itemFaceIndex
 * @desc アイテム使用時のインデックス番号。
 * @text アイテム使用時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent AttackSetting
 * 
 * @param recoveryFaceIndex
 * @desc 回復スキル使用時のインデックス番号。
 * @text 回復スキル使用時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent AttackSetting
 * 
 * @param StateSetting
 * @text 被ステート時画像
 * @default ------------------------------
 * 
 * @param stateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を設定します。
 * @type struct<actorStateImgList>[]
 * @parent StateSetting
 * 
 * @param HPSetting
 * @text 残りHP画像
 * @default ------------------------------
 * 
 * @param hpImg
 * @text 残りHP画像
 * @desc 指定の残りHPでの画像を表示します。（複数指定可能）
 * @type struct<actorHPImgList>[]
 * @parent HPSetting
 * 
 */
/*~struct~actorStateImgList:
 * 
 * @param actorStateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を表示します。
 * @type file
 * @dir img/pictures
 * 
 * @param stateFaceIndex
 * @desc 被ステート時のインデックス番号。
 * @text 被ステート時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * 
 * @param stateImgId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<ChangeImgId:[id]>を記入してください。[id]:変化ID
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text プロパティID
 * @desc プロパティID
 * @type number
 * @default 1
 * @min 0
 * @max 9999
 * 
 */
/*~struct~actorStateFaceIndexList:
 * 
 * @param actorStateIndex
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * 
 * @param stateFaceId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<ChangeImgId:[id]>を記入してください。[id]:変化ID
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text プロパティID
 * @desc プロパティID
 * @type number
 * @default 1
 * @min 0
 * @max 9999
 * 
 */
/*~struct~actorHPImgList:
 * 
 * @param actorHpImg
 * @text 残りHP画像
 * @desc 残りHPの画像を表示します。
 * @type file
 * @dir img/pictures
 * 
 * @param actorHpFaceIndex
 * @text 残りHPインデックス番号
 * @desc 残りHPのインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * 
 * @param UpLimit
 * @text 上限値(%)
 * @desc 上限値
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text 下限値(%)
 * @desc 下限値
 * @type number
 * @default 0
 * 
 */
/*~struct~ActorPictureDataList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param FaceMode
 * @desc アクターステータスのアクター画像を顔グラで表示します。
 * @text 顔グラ表示。
 * @type boolean
 * @default true
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * 
 */
/*~struct~PopUpBuffList:
 * 
 * @param StateType
 * @text アクターステータス表示方法
 * @desc アクターステータスの表示方法を選択します。
 * @type select
 * @option HP上昇
 * @value 0
 * @option MP上昇
 * @value 1
 * @option 攻撃力上昇
 * @value 2
 * @option 防御力上昇
 * @value 3
 * @option 魔法力上昇
 * @value 4
 * @option 魔法防御上昇
 * @value 5
 * @option 敏捷性上昇
 * @value 6
 * @option 運上昇
 * @value 7
 * @option HP低下
 * @value 10
 * @option MP低下
 * @value 11
 * @option 攻撃力低下
 * @value 12
 * @option 防御力低下
 * @value 13
 * @option 魔法力低下
 * @value 14
 * @option 魔法防御低下
 * @value 15
 * @option 敏捷性低下
 * @value 16
 * @option 運低下
 * @value 17
 * @default 0
 * 
 * @param PopUpStateName
 * @text ポップアップステート名
 * @desc ポップアップするステート名です。記入がない場合はデフォルトのステート名が表示されます。
 * @type string
 * 
 * @param StatePopUpMode
 * @text ポップアップの表示
 * @desc ポップアップの表示を選択します。
 * @type select
 * @option ポップアップする
 * @value 0
 * @option ポップアップしない
 * @value 1
 * @option 付与時のみポップアップしない
 * @value 2
 * @option 解除時のみポップアップしない
 * @value 3
 * @default 0
 * 
 * @param PopUpStateColor
 * @desc ポップアップするときのステートの色
 * @text 文字色
 * @type number
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX = true;
