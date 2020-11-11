/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Text, Button, Image } from 'theme-ui'
import Link from 'next/link'
import { useState } from 'react'
import { useCombobox } from 'downshift'

// const chevronDown = require('../public/icons/chevron-down.png')

type MenuItem = {
  name: string
  href: string
}
interface MenuProps {
  name: any
  items: Array<MenuItem>
  onChange: any // TODO: type better
}

export default function Menu ({ name, items, onChange }: MenuProps) {
  // const {
  //   getToggleButtonProps,
  //   getMenuProps,
  //   getItemProps,
  //   getComboboxProps
  // } = useCombobox({
  //   items,
  //   onSelectedItemChange: onChange
  // })
  const [open, setOpen] = useState(false)

  return (
    <Flex sx={{ position: 'relative', flex: 1, flexDirection: 'column' }}>
      <Button type='button' onClick={() => setOpen(!open)}>
        <Text mr={4}>{name}</Text>
      </Button>
      {open && (
        <Flex
          bg='grey'
          sx={{
            position: 'absolute',
            top: '100%',
            flexDirection: 'column',
            zIndex: 10
          }}
        >
          {items.map(i => (
            <Link href={i.href}>{i.name}</Link>
          ))}
        </Flex>
      )}

      {/* <Flex
        {...getMenuProps()}
        bg='white'
        sx={{
          position: 'absolute',
          top: 4,
          width: '100%',
          flexDirection: 'column',
          zIndex: 100
        }}
      >
        {isOpen &&
          items.map((item, index) => (
            <Flex
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
              px={3}
              py={2}
              sx={{
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  bg: 'greyBackground'
                }
              }}
            >
              <Text>{item.name}</Text>
            </Flex>
          ))}
      </Flex> */}
    </Flex>
  )
}
