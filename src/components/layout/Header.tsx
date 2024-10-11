'use client'

import { ComponentPropsWithoutRef, forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/nav/MobileNavigation'
import { useMobileNavigationStore } from '@/components/nav/MobileNavigation'
import { Search } from '@/components/layout/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import GitHubStarCount from '../GitHubStarCount'
import { GitHubIcon } from '../icons/GitHubIcon'

function TopLevelNavItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className={cn(
          'text-sm font-semibold leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
          className,
        )}
      />
    </li>
  )
}

export const Header = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(function Header({ className, ...props }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8',
        !isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-background'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-background/[var(--bg-opacity-dark)]',
      )}
      style={
        {
          '--bg-opacity-light': bgOpacityLight,
          '--bg-opacity-dark': bgOpacityDark,
        } as any
      }
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-gray-800/7.5 dark:bg-white/7.5',
        )}
      />
      <Link href="/" aria-label="Home" className="hidden lg:block">
        <Logo className="h-6" />
      </Link>
      <div className="hidden lg:block">
        <Search />
      </div>
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem
              href={'https://nitric.io'}
              target="_blank"
              rel="noreferrer noopener"
            >
              Nitric.io
            </TopLevelNavItem>

            <TopLevelNavItem
              className="group flex items-center"
              rel="noreferrer noopener"
              href="https://github.com/nitrictech/nitric"
            >
              <GitHubIcon className="dark:fill-gray h-5 w-5 fill-current" />
              <GitHubStarCount className="ml-2 text-inherit" />
            </TopLevelNavItem>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  )
})
