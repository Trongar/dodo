import { sidebarAtom } from 'atoms'
import { useAtom } from 'jotai'
import Head from 'next/head'
import React from 'react'
import {
  BiBox,
  BiCalendarAlt,
  BiCalendarCheck,
  BiChevronDown,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiHdd,
  BiListUl,
  BiPlus,
  BiSearch,
  BiTrash,
} from 'react-icons/bi'

const Layout = ({ children }: any) => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom)
  return (
    <div className='flex min-h-screen'>
      <Head>
        <title>Todo App</title>
      </Head>
      <aside
        className={
          (sidebar ? 'w-screen md:w-60 ' : 'w-14 delay-300 ') +
          '  bg-base-side border-r-base-divider border-r-2 overflow-hidden h-screen absolute md:static'
        }
      >
        <Divider />
        <div className='h-7 w-full px-3 flex'>
          <div className={sidebar ? 'grow' : 'grow-0'} />
          <button
          title='Sidebar Controller'
            className='hover:bg-base-selected p-1 rounded'
            onClick={() => {
              setSidebar(!sidebar)
            }}
          >
            {sidebar ? (
              <BiChevronsLeft size={'20px'} />
            ) : (
              <BiChevronsRight size={'20px'} />
            )}
          </button>
        </div>
        <SideBarRow
          icon={
            <p className='font-bold bg-base-content rounded w-5 h-5 text-base-container'>
              E
            </p>
          }
          label={<p>Edgar Sánchez</p>}
        />
        <Divider />
        <SideBarRow
          icon={<BiSearch size={'20px'} />}
          label={<span>Quick Find</span>}
        />
        <SideBarRow
          icon={<BiHdd size={'20px'} />}
          label={<span>Inbox</span>}
        />
        <Divider />
        <SideBarRow
          icon={<BiCalendarCheck size={'20px'} />}
          label={<span>Today</span>}
          number={<>7</>}
        />
        <SideBarRow
          icon={<BiCalendarAlt size={'20px'} />}
          label={<span>Upcoming</span>}
          number={<>7</>}
        />
        <SideBarRow
          icon={<BiBox size={'20px'} />}
          label={<span>Some day</span>}
          number={<>7</>}
        />
        <Divider />

        <SideBarRow
          icon={<BiTrash size={'20px'} />}
          label={<span>Trash</span>}
        />
        <Divider />
        <Divider className='border-b-2 border-b-base-divider' />
        <Divider />
        <Lists />
      </aside>
      {children}
    </div>
  )
}

const Divider = ({ className }: { className?: string }) => (
  <div className={className ?? '' + ' h-4'} />
)

const SideBarRow = ({
  icon,
  label,
  number,
  onClick,
}: {
  icon?: JSX.Element | React.ReactElement | null
  label?: JSX.Element | React.ReactElement | null
  number?: JSX.Element | React.ReactElement | null
  onClick?: Function
}) => {
  const [sidebar] = useAtom(sidebarAtom)
  return (
    <div className='h-7 w-full px-3'>
      <div
        className='flex justify-between w-full  hover:bg-base-selected cursor-pointer p-1 rounded'
        onClick={() => {
          if (onClick) onClick()
        }}
      >
        <div className='flex gap-4'>
          <div className=' text-center leading-5 grid justify-center content-center'>
            {icon}
          </div>
          <div
            className={
              sidebar
                ? ' opacity-100 delay-300'
                : 'opacity-0' + ' mr-4 block overflow-visible truncate'
            }
          >
            {label}
          </div>
        </div>
        <div
          className={
            sidebar
              ? 'opacity-100 delay-500'
              : 'opacity-0' + ' mr-4 inline-block'
          }
        >
          {number}
        </div>
      </div>
    </div>
  )
}

const Lists = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom)
  const [open, setOpen] = React.useState(true)
  return (
    <>
      <SideBarRow
        icon={
          sidebar ? (
            open ? (
              <BiChevronDown size={'20px'} />
            ) : (
              <BiChevronRight size={'20px'} />
            )
          ) : (
            <BiListUl size={'20px'} />
          )
        }
        label={<span>List</span>}
        onClick={() => {
          if (!sidebar) {
            setOpen(true)
            setSidebar(true)
          } else setOpen(!open)
        }}
      />
      <div
        className={
          open && sidebar ? 'opacity-100' : 'opacity-0 -translate-x-80'
        }
      >
        <SideBarRow
          icon={<></>}
          label={
            <SideBarRow
              icon={<>😋</>}
              label={<span>Personal</span>}
            />
          }
          number={<>7</>}
        />
        <SideBarRow
          icon={<></>}
          label={
            <SideBarRow
              icon={<BiPlus size={'20px'} />}
              label={<span>New List</span>}
            />
          }
        />
      </div>
    </>
  )
}

export default Layout
