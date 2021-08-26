"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTemplate = void 0;
const config_1 = require("@backstage/config");
const backend_common_1 = require("@backstage/backend-common");
const plugin_scaffolder_backend_1 = require("@backstage/plugin-scaffolder-backend");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const winston_1 = __importDefault(require("winston"));
function runTemplate(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = new config_1.ConfigReader({});
        const logger = winston_1.default.createLogger({
            level: 'info',
            transports: [
                new winston_1.default.transports.Console({
                    format: winston_1.default.format.simple(),
                }),
            ],
        });
        const templater = plugin_scaffolder_backend_1.createFetchTemplateAction({
            reader: backend_common_1.UrlReaders.create({
                logger,
                config,
            }),
            integrations: null,
        });
        const context = {
            baseUrl: `file://${process.cwd()}/src`,
            logger,
            workspacePath: process.cwd(),
            input,
            createTemporaryDirectory() {
                return __awaiter(this, void 0, void 0, function* () {
                    return fs_extra_1.default.mkdtemp(path_1.default.resolve(os_1.default.tmpdir(), 'scaffold'));
                });
            },
            // unused in testing but required for typing
            logStream: null,
            output: null,
        };
        return templater.handler(context);
    });
}
exports.runTemplate = runTemplate;
