/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'my-indicator-extension';

const { GnomeDesktop, GObject, GLib, Shell, St } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const _ = ExtensionUtils.gettext;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('My Shiny Indicator'));

		const icon = new St.Icon({ icon_name: 'dialog-password-symbolic', style_class: 'system-status-icon' });
		this.connect('button-press-event', () => {
			let pid;
			let argv;
			try {
				const [_success, _argv] = GLib.shell_parse_argv("slock");
				argv = _argv;
				if (!_success)
					throw new Error('could not parse argv');
				const context = global.create_app_launch_context(0, -1);
				pid = GLib.spawn_async(null, argv, context.get_environment(), GLib.SpawnFlags.SEARCH_PATH, () => {});
				log('[XENOBAS]: Done')
			} catch (error) {
				let message;
				if (error.matches(GLib.SpawnError, GLib.SpawnError.NOENT))
					message = "slock command not found"
				else if (error instanceof GLib.Error)
					message = error.message.replace(/.*\((.+)\)/, '$1');
				else
					message = error.message ?? "unknown error"
				const report = `failed slock because of '${message}'`
				log(report)
				Main.notify(_(report))
			}
		});
        this.add_child(icon);
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
