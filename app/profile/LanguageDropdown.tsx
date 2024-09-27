import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, SharedSelection } from "@nextui-org/react";

type Props = {
    selectedKey: string;
    setSelectedKey: (e: SharedSelection) => void
}

const LanguageDropdown = ({ selectedKey, setSelectedKey }: Props) => {
    return (
        <div>
            <Dropdown className='bg-danger'>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize"
                    >
                        {selectedKey}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKey}
                    onSelectionChange={setSelectedKey}
                >
                    <DropdownItem key="javascript">Javascript</DropdownItem>
                    <DropdownItem key="go">Go</DropdownItem>
                    <DropdownItem key="python">Python</DropdownItem>
                    <DropdownItem key="c/c++">C/C++</DropdownItem>
                    <DropdownItem key="rust">Rust</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default LanguageDropdown