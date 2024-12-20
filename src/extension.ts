import * as vscode from 'vscode';
import OpenAI from 'openai';

export function activate(context: vscode.ExtensionContext) {
    try {
        const openai = new OpenAI({
            apiKey: vscode.workspace.getConfiguration('gptAssistant').get('apiKey')
        });

        let disposable = vscode.commands.registerCommand('vscode-gpt-assistant.askGPT', async () => {
            const editor = vscode.window.activeTextEditor;
            
            if (!editor) {
                vscode.window.showErrorMessage('에디터가 활성화되어 있지 않습니다.');
                return;
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            if (!text) {
                vscode.window.showErrorMessage('텍스트를 선택해주세요.');
                return;
            }

            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [{
                        role: "user",
                        content: `다음 코드를 분석해주세요:\n\n${text}`
                    }],
                    temperature: 0.7,
                    max_tokens: 2000
                });

                const result = response.choices[0]?.message?.content;
                
                if (result) {
                    // 새 문서 생성
					const doc = await vscode.workspace.openTextDocument({
						content: result,
						language: 'markdown'
					});

                    // 새 에디터에 표시
                    await vscode.window.showTextDocument(doc, {
                        viewColumn: vscode.ViewColumn.Beside,
                        preview: true
                    });
                } else {
                    vscode.window.showErrorMessage('GPT로부터 응답을 받지 못했습니다.');
                }
            } catch (error) {
                vscode.window.showErrorMessage('GPT API 호출 중 오류가 발생했습니다.');
                if (error instanceof Error) {
                    console.error('Error details:', error.message);
                }
            }
        });

        // 코드 완성 명령어
        let codeCompleteDisposable = vscode.commands.registerCommand('vscode-gpt-assistant.codeComplete', async () => {
            const editor = vscode.window.activeTextEditor;
            
            if (!editor) {
                vscode.window.showErrorMessage('에디터가 활성화되어 있지 않습니다.');
                return;
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [{
                        role: "user",
                        content: `Complete this code:\n\n${text}\n\nProvide only the code completion without any explanation.`
                    }],
                    temperature: 0.7,
                });

                const suggestion = response.choices[0]?.message?.content;
                if (suggestion) {
                    await editor.edit(editBuilder => {
                        editBuilder.replace(selection, suggestion);
                    });
                }
            } catch (error) {
                vscode.window.showErrorMessage('GPT API 호출 중 오류가 발생했습니다.');
                if (error instanceof Error) {
                    console.error('Error details:', error.message);
                }
            }
        });

        // 코드 개선 명령어
        let improveCodeDisposable = vscode.commands.registerCommand('vscode-gpt-assistant.improveCode', async () => {
            const editor = vscode.window.activeTextEditor;
            
            if (!editor) {
                vscode.window.showErrorMessage('에디터가 활성화되어 있지 않습니다.');
                return;
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [{
                        role: "user",
                        content: `Improve this code and explain the improvements:\n\n${text}`
                    }],
                    temperature: 0.7,
                });

                const improvements = response.choices[0]?.message?.content;
				if (improvements) {
					const doc = await vscode.workspace.openTextDocument({
						content: improvements,
						language: 'markdown'
					});

                    await vscode.window.showTextDocument(doc, {
                        viewColumn: vscode.ViewColumn.Beside,
                        preview: true
                    });
                }
            } catch (error) {
                vscode.window.showErrorMessage('GPT API 호출 중 오류가 발생했습니다.');
                if (error instanceof Error) {
                    console.error('Error details:', error.message);
                }
            }
        });

        context.subscriptions.push(disposable);
        context.subscriptions.push(codeCompleteDisposable);
        context.subscriptions.push(improveCodeDisposable);

    } catch (error) {
        vscode.window.showErrorMessage('확장 프로그램 초기화 중 오류가 발생했습니다.');
        if (error instanceof Error) {
            console.error('Initialization error:', error.message);
        }
    }
}

export function deactivate() {}