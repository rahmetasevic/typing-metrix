import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { MdCheck } from "react-icons/md";

import { themes } from "@assets/styles/themes/themes";
import { ModalProps } from "types/index";

import "./ThemeModal.scss";
import { Button } from "@components/Common/Button";

export const ThemeModal = (props: ModalProps) => {
    const { visible, close } = props;
    const [selectedTheme, setSelectedTheme] = useState<string>("dark");

    function handleSelectTheme(e: React.MouseEvent<HTMLDivElement>): void {
        const val = (e.currentTarget as HTMLDivElement).dataset.value;

        if (val) {
            setSelectedTheme(val);
            document.body.setAttribute("data-theme", val);
        }
    }

    return visible ? (
        <div
            className={`themes ${visible ? "themes__show" : ""}`}
            onClick={(e) => {
                e.stopPropagation();
                close();
            }}
        >
            <div className="themes__modal">
                {themes.map((key, i) => (
                    <div
                        className={`themes__modal__theme theme-${key.name}`}
                        style={{
                            backgroundColor: `${key.backgroundPrimary}`,
                            color: `${key.textPrimary}`,
                        }}
                    >
                        <div
                            className="themes__modal__display"
                            data-value={key.name}
                            onClick={handleSelectTheme}
                        >
                            <div className="themes__colors">
                                <div
                                    className="themes__colors__paint"
                                    style={{
                                        backgroundColor: `${key.primary}`,
                                    }}
                                ></div>
                                <div
                                    className="themes__colors__paint"
                                    style={{
                                        backgroundColor: `${key.secondary}`,
                                    }}
                                ></div>
                                <div
                                    className="themes__colors__paint"
                                    style={{
                                        backgroundColor: `${key.textPrimary}`,
                                    }}
                                ></div>
                                <p>{key.name}</p>
                            </div>
                        </div>
                        <div className="themes__modal__controls">
                            <Button
                                className="themes__favorite themes--highlighted"
                                type="button"
                            >
                                <IoMdStar
                                    style={{
                                        color: `${key.secondary}`,
                                    }}
                                />
                            </Button>
                            {selectedTheme === key.name && (
                                <MdCheck
                                    style={{
                                        color: `${key.textPrimary}`,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
};
