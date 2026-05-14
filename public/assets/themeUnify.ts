import type {
  ArrowTheme,
  AvatarGroupTheme,
  AvatarTheme,
  BackdropTheme,
  BadgeTheme,
  BreadcrumbsTheme,
  ButtonTheme,
  CalendarTheme,
  CalloutTheme,
  CardTheme,
  CheckboxTheme,
  ChipTheme,
  CollapseTheme,
  CommandPaletteInputTheme,
  CommandPaletteItemTheme,
  CommandPaletteSectionTheme,
  CommandPaletteTheme,
  ContextMenuTheme,
  DateFormatTheme,
  DateInputTheme,
  DialogTheme,
  DividerTheme,
  DotsLoaderTheme,
  DrawerTheme,
  EllipsisTheme,
  FieldTheme,
  InputTheme,
  JsonTreeTheme,
  KbdTheme,
  ListTheme,
  MenuTheme,
  NavigationTheme,
  NotificationTheme,
  PagerTheme,
  PopoverTheme,
  RadioTheme,
  RangeTheme,
  ReablocksTheme,
  RedactTheme,
  SelectTheme,
  SkeletonTheme,
  SortTheme,
  StepperTheme,
  TabsTheme,
  TextareaTheme,
  ToggleTheme,
  TooltipTheme,
  TreeTheme,
  TypographyTheme
} from 'reablocks';

// region arrowTheme.ts
export const arrowTheme: ArrowTheme = {
  base: 'text-content-assets-neutral-base',
  up: 'rotate-180',
  down: '',
  left: 'rotate-90',
  right: '-rotate-90'
};
// endregion arrowTheme.ts

// region avatarTheme.ts
export const avatarTheme: AvatarTheme = {
  base: `
    relative flex justify-center items-center bg-cover bg-center font-bold transition-colors
    after:absolute after:inset-0 after:border
    bg-avatar-colors-background-container-resting 
    after:border-avatar-colors-stroke-container-resting
  `,
  rounded: 'rounded-full after:rounded-full'
};
// endregion avatarTheme.ts

// region avatarGroupTheme.ts
export const avatarGroupTheme: AvatarGroupTheme = {
  base: 'flex items-center text-avatar-colors-text-resting',
  avatar: '-ml-2.5',
  overflow: 'ml-[5px]'
};
// endregion avatarGroupTheme.ts

// region backdropTheme.ts
export const backdropTheme: BackdropTheme = {
  base: 'fixed top-0 left-0 w-full h-full opacity-0 select-none bg-black',
  opacity: 0.2
};
// endregion backdropTheme.ts

// region badgeTheme.ts
export const badgeTheme: BadgeTheme = {
  base: 'relative inline-flex align-middle shrink-0 mx-2 my-0',
  disableMargins: 'm-0',
  badge: `flex flex-row flex-wrap justify-center content-center items-center absolute box-border
   leading-none text-xs p-(--badges-details-horizontal-padding-sm) size-(--badges-details-height-sm) z-1 rounded-[50%] pointer-events-none `,
  position: 'translate-x-1/2 -translate-y-1/2 origin-[100%_0%] right-0 top-0',
  positions: {
    'top-start':
      'top-0 left-0 -translate-x-1/2 -translate-y-1/2 origin-[0%_0%]',
    'top-end':
      'top-0 right-0 translate-x-1/2 -translate-y-1/2 origin-[100%_0%]',
    'bottom-start':
      'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 origin-[0%_100%]',
    'bottom-end':
      'bottom-0 right-0 translate-x-1/2 translate-y-1/2 origin-[100%_100%]'
  },
  colors: {
    default: 'bg-background-neutral-raised-base text-content-text-inverse-base',
    primary: 'bg-background-brand-base text-content-text-inverse-base',
    secondary: 'bg-background-neutral-raised-3 text-content-text-inverse-base',
    error: 'bg-background-semantic-error-base text-content-text-inverse-base'
  }
};
// endregion badgeTheme.ts

// region breadcrumbsTheme.ts
export const breadcrumbsTheme: BreadcrumbsTheme = {
  base: 'text-breadcrumbs-colors-primary-text-resting',
  separator: '[&>svg]:size-(--breadcrumbs-details-asset-size-sm)',
  list: 'flex gap-(--breadcrumbs-details-space-between-lg) items-center',
  link: 'hover:text-breadcrumbs-colors-primary-text-hover transition-colors',
  activePage:
    'text-breadcrumbs-colors-primary-text-selected pointer-events-none'
};
// endregion breadcrumbsTheme.ts

// region buttonTheme.ts
export const buttonTheme: ButtonTheme = {
  base: `
    inline-flex items-center justify-center font-sans
    cursor-pointer font-semibold whitespace-nowrap
    rounded-(--buttons-details-corner-radius-base) font-semibold cursor-pointer select-none transition-colors [&_svg]:transition-all focus-visible:outline-none
  `,
  disabled: `
    disabled:opacity-40 disabled:cursor-not-allowed
  `,
  fullWidth: 'flex w-full',
  group:
    'rounded-none first:rounded-s last:rounded-e border-s-0 first:border-s',
  groupText:
    'border border-y-transparent border-l-transparent last:border-r-transparent hover:bg-initial',
  adornment: {
    base: 'flex',
    start:
      'pr-(--buttons-details-space-between-horizontal-md) [&.large]:pr-(--buttons-details-space-between-horizontal-lg)',
    end: 'pl-(--buttons-details-space-between-horizontal-md) [&.large]:pl-(--buttons-details-space-between-horizontal-lg)',
    sizes: {
      small: '[&>svg]:size-(--buttons-details-asset-size-sm) small',
      medium: '[&>svg]:size-(--buttons-details-asset-size-md) medium',
      large: '[&>svg]:size-(--buttons-details-asset-size-lg) large'
    }
  },
  sizes: {
    small:
      'h-(--buttons-details-height-core-icon-sm) text-xs px-(--buttons-details-horizontal-padding-sm)',
    medium:
      'h-(--buttons-details-height-core-icon-md) text-sm px-(--buttons-details-horizontal-padding-md)',
    large:
      'h-(--buttons-details-height-core-icon-lg) text-base px-(--buttons-details-horizontal-padding-lg)'
  },
  iconSizes: {
    xsmall:
      'size-(--buttons-details-height-core-icon-xs) [&>svg]:size-(--buttons-details-asset-size-xs) px-0 py-0',
    small:
      'size-(--buttons-details-height-core-icon-sm) [&>svg]:size-(--buttons-details-asset-size-sm) px-0 py-0',
    medium:
      'size-(--buttons-details-height-core-icon-md) [&>svg]:size-(--buttons-details-asset-size-md) px-0 py-0',
    large:
      'size-(--buttons-details-height-core-icon-lg) [&>svg]:size-(--buttons-details-asset-size-lg) px-0 py-0'
  },
  variants: {
    filled:
      'bg-secondary hover:bg-border-secondary-hover border-1 border-buttons-colors-core-icon-primary-stroke-hover',
    outline: 'border',
    text: 'border-0',
    ghost: '',
    link: 'border-0 border-b rounded-none border-transparent hover:border-b-buttons-colors-link-secondary-underline-detail-hover'
  },
  colors: {
    primary: {
      filled: `
        bg-buttons-colors-core-icon-primary-background-resting border-buttons-colors-core-icon-primary-stroke-resting text-buttons-colors-core-icon-primary-text-resting [&_svg]:fill-buttons-colors-core-icon-primary-assets-resting
        hover:bg-buttons-colors-core-icon-primary-background-hover hover:border-buttons-colors-core-icon-primary-stroke-hover hover:text-buttons-colors-core-icon-primary-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-primary-assets-hover
        focus-visible:bg-buttons-colors-core-icon-primary-background-selected focus-visible:border-buttons-colors-core-icon-primary-stroke-selected focus-visible:text-buttons-colors-core-icon-primary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-primary-assets-selected
        disabled:bg-buttons-colors-core-icon-primary-background-resting disabled:border-buttons-colors-core-icon-primary-stroke-resting disabled:text-buttons-colors-core-icon-primary-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-primary-assets-resting
      `,
      outline: `
        bg-buttons-colors-core-icon-outline-background-resting border-buttons-colors-core-icon-outline-stroke-resting text-buttons-colors-core-icon-outline-text-resting [&_svg]:fill-buttons-colors-core-icon-outline-assets-resting
        hover:bg-buttons-colors-core-icon-outline-background-hover hover:border-buttons-colors-core-icon-outline-stroke-hover hover:text-buttons-colors-core-icon-outline-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-outline-assets-hover
        focus-visible:bg-buttons-colors-core-icon-outline-background-selected focus-visible:border-buttons-colors-core-icon-outline-stroke-selected focus-visible:text-buttons-colors-core-icon-outline-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-outline-assets-selected
        disabled:bg-buttons-colors-core-icon-outline-background-resting disabled:border-buttons-colors-core-icon-outline-stroke-resting disabled:text-buttons-colors-core-icon-outline-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-outline-assets-resting
      `,
      text: `
        text-buttons-colors-link-primary-text-resting hover:text-buttons-colors-link-primary-text-hover focus-visible:text-buttons-colors-link-primary-text-selected
         hover:[&_svg]:fill-buttons-colors-link-primary-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-primary-assets-selected
        disabled:text-buttons-colors-link-primary-text-resting 
      `,
      ghost: `
        bg-buttons-colors-core-icon-ghost-background-resting border-buttons-colors-core-icon-ghost-stroke-resting text-buttons-colors-core-icon-ghost-text-resting [&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
        hover:bg-buttons-colors-core-icon-ghost-background-hover hover:border-buttons-colors-core-icon-ghost-stroke-hover hover:text-buttons-colors-core-icon-ghost-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-hover
        focus-visible:bg-buttons-colors-core-icon-ghost-background-selected focus-visible:border-buttons-colors-core-icon-ghost-stroke-selected focus-visible:text-buttons-colors-core-icon-ghost-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-selected
        disabled:bg-buttons-colors-core-icon-ghost-background-resting disabled:border-buttons-colors-core-icon-ghost-stroke-resting disabled:text-buttons-colors-core-icon-ghost-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
      `,
      link: `
        text-buttons-colors-link-primary-text-resting hover:text-buttons-colors-link-primary-text-hover focus-visible:text-buttons-colors-link-primary-text-selected
        hover:[&_svg]:fill-buttons-colors-link-primary-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-primary-assets-selected
        disabled:text-buttons-colors-link-primary-text-resting disabled:[&_svg]:fill-buttons-colors-link-primary-assets-resting
        focus-visible:[&_svg]:fill-buttons-colors-link-primary-assets-selected
      `
    },
    secondary: {
      filled: `
        bg-buttons-colors-core-icon-secondary-background-resting border-buttons-colors-core-icon-secondary-stroke-resting text-buttons-colors-core-icon-secondary-text-resting [&_svg]:fill-buttons-colors-core-icon-secondary-assets-resting
        hover:bg-buttons-colors-core-icon-secondary-background-hover hover:border-buttons-colors-core-icon-secondary-stroke-hover hover:text-buttons-colors-core-icon-secondary-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-secondary-assets-hover
        focus-visible:bg-buttons-colors-core-icon-secondary-background-selected focus-visible:border-buttons-colors-core-icon-secondary-stroke-selected focus-visible:text-buttons-colors-core-icon-secondary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-secondary-assets-selected
        disabled:bg-buttons-colors-core-icon-secondary-background-resting disabled:border-buttons-colors-core-icon-secondary-stroke-resting disabled:text-buttons-colors-core-icon-secondary-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-secondary-assets-resting
      `,
      outline: `
        border-buttons-colors-core-icon-secondary-background-resting text-buttons-colors-core-icon-secondary-text-resting [&_svg]:fill-buttons-colors-core-icon-secondary-assets-resting
        hover:border-buttons-colors-core-icon-secondary-background-hover hover:text-buttons-colors-core-icon-secondary-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-secondary-assets-hover
        focus-visible:border-buttons-colors-core-icon-secondary-background-selected focus-visible:text-buttons-colors-core-icon-secondary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-secondary-assets-selected
        disabled:border-buttons-colors-core-icon-secondary-background-resting disabled:text-buttons-colors-core-icon-secondary-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-secondary-assets-resting
      `,
      text: `
        text-buttons-colors-link-secondary-text-resting hover:text-buttons-colors-link-secondary-text-hover focus-visible:text-buttons-colors-link-secondary-text-selected
        [&_svg]:fill-buttons-colors-link-secondary-assets-resting hover:[&_svg]:fill-buttons-colors-link-secondary-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-secondary-assets-selected
        disabled:text-buttons-colors-link-secondary-text-resting disabled:[&_svg]:fill-buttons-colors-link-secondary-assets-resting
        hover:text-buttons-colors-core-icon-ghost-text-hover focus-visible:text-buttons-colors-core-icon-ghost-text-selected
      `,
      ghost: `
        bg-buttons-colors-core-icon-ghost-background-resting border-buttons-colors-core-icon-ghost-stroke-resting text-buttons-colors-core-icon-ghost-text-resting [&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
        hover:bg-buttons-colors-core-icon-secondary-background-hover hover:border-buttons-colors-core-icon-ghost-stroke-hover hover:text-buttons-colors-core-icon-secondary-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-hover
        focus-visible:bg-buttons-colors-core-icon-secondary-background-selected focus-visible:border-buttons-colors-core-icon-secondary-stroke-selected focus-visible:text-buttons-colors-core-icon-secondary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-selected
        disabled:bg-buttons-colors-core-icon-ghost-background-resting disabled:border-buttons-colors-core-icon-ghost-stroke-resting disabled:text-buttons-colors-core-icon-secondary-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
      `,
      link: `
        text-buttons-colors-link-secondary-text-resting hover:text-buttons-colors-link-secondary-text-hover focus-visible:text-buttons-colors-link-secondary-text-selected
        [&_svg]:fill-buttons-colors-link-secondary-assets-resting hover:[&_svg]:fill-buttons-colors-link-secondary-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-secondary-assets-selected
        disabled:text-buttons-colors-link-secondary-text-resting disabled:[&_svg]:fill-buttons-colors-link-secondary-assets-resting
        hover:border-b-buttons-colors-core-icon-secondary-background-hover focus-visible:text-buttons-colors-core-icon-ghost-text-selected
      `
    },
    default: {
      filled: `
        bg-buttons-colors-core-icon-primary-background-resting border-buttons-colors-core-icon-primary-stroke-resting text-buttons-colors-core-icon-primary-text-resting [&_svg]:fill-buttons-colors-core-icon-primary-assets-resting
        hover:bg-buttons-colors-core-icon-primary-background-hover hover:border-buttons-colors-core-icon-primary-stroke-hover hover:text-buttons-colors-core-icon-primary-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-primary-assets-hover
        focus-visible:bg-buttons-colors-core-icon-primary-background-selected focus-visible:border-buttons-colors-core-icon-primary-stroke-selected focus-visible:text-buttons-colors-core-icon-primary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-primary-assets-selected
        disabled:bg-buttons-colors-core-icon-primary-background-resting disabled:border-buttons-colors-core-icon-primary-stroke-resting disabled:text-buttons-colors-core-icon-primary-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-primary-assets-resting
      `,
      outline: `
        bg-buttons-colors-core-icon-outline-background-resting border-buttons-colors-core-icon-outline-stroke-resting text-buttons-colors-core-icon-outline-text-resting [&_svg]:fill-buttons-colors-core-icon-outline-assets-resting
        hover:bg-buttons-colors-core-icon-outline-background-hover hover:border-buttons-colors-core-icon-outline-stroke-hover hover:text-buttons-colors-core-icon-outline-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-outline-assets-hover
        focus-visible:bg-buttons-colors-core-icon-outline-background-selected focus-visible:border-buttons-colors-core-icon-outline-stroke-selected focus-visible:text-buttons-colors-core-icon-outline-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-outline-assets-selected
        disabled:bg-buttons-colors-core-icon-outline-background-resting disabled:border-buttons-colors-core-icon-outline-stroke-resting disabled:text-buttons-colors-core-icon-outline-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-outline-assets-resting
      `,
      text: `
        text-buttons-colors-link-primary-text-resting hover:text-buttons-colors-link-primary-text-hover focus-visible:text-buttons-colors-link-primary-text-selected
        [&_svg]:fill-buttons-colors-link-primary-assets-resting hover:[&_svg]:fill-buttons-colors-link-primary-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-primary-assets-selected
        disabled:text-buttons-colors-link-primary-text-resting disabled:[&_svg]:fill-buttons-colors-link-primary-assets-resting
      `,
      ghost: `
        bg-buttons-colors-core-icon-ghost-background-resting border-buttons-colors-core-icon-ghost-stroke-resting text-buttons-colors-core-icon-ghost-text-resting [&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
        hover:bg-buttons-colors-core-icon-ghost-background-hover hover:border-buttons-colors-core-icon-ghost-stroke-hover hover:text-buttons-colors-core-icon-ghost-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-hover
        focus-visible:bg-buttons-colors-core-icon-ghost-background-selected focus-visible:border-buttons-colors-core-icon-ghost-stroke-selected focus-visible:text-buttons-colors-core-icon-ghost-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-selected
        disabled:bg-buttons-colors-core-icon-ghost-background-resting disabled:border-buttons-colors-core-icon-ghost-stroke-resting disabled:text-buttons-colors-core-icon-ghost-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
      `,
      link: `
        text-buttons-colors-link-primary-text-resting hover:text-buttons-colors-link-primary-text-hover focus-visible:text-buttons-colors-link-primary-text-selected
        [&_svg]:fill-buttons-colors-link-primary-assets-resting hover:[&_svg]:fill-buttons-colors-link-primary-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-primary-assets-selected
        disabled:text-buttons-colors-link-primary-text-resting disabled:[&_svg]:fill-buttons-colors-link-primary-assets-resting
        focus-visible:[&_svg]:fill-buttons-colors-link-primary-assets-selected
      `
    },
    success: {
      filled:
        'bg-background-semantic-success-5 border-background-semantic-success-4 hover:bg-background-semantic-success-4 hover:border-background-semantic-success-3',
      outline:
        'border-background-semantic-success-4 hover:border-background-semantic-success-3',
      text: 'text-content-text-semantic-success-base hover:text-content-text-semantic-success-1'
    },
    warning: {
      filled:
        'bg-background-semantic-warning-5 border-background-semantic-warning-4 hover:bg-background-semantic-warning-4 hover:border-background-semantic-warning-3',
      outline:
        'border-background-semantic-warning-4 hover:border-background-semantic-warning-3',
      text: 'text-content-text-semantic-warning-base hover:text-content-text-semantic-warning-1'
    },
    destructive: {
      filled: `
        bg-buttons-colors-core-icon-destructive-background-resting border-buttons-colors-core-icon-destructive-stroke-resting text-buttons-colors-core-icon-destructive-text-resting [&_svg]:fill-buttons-colors-core-icon-destructive-assets-resting
        hover:bg-buttons-colors-core-icon-destructive-background-hover hover:border-buttons-colors-core-icon-destructive-stroke-hover hover:text-buttons-colors-core-icon-destructive-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-destructive-assets-hover
        focus-visible:bg-buttons-colors-core-icon-destructive-background-selected focus-visible:border-buttons-colors-core-icon-destructive-stroke-selected focus-visible:text-buttons-colors-core-icon-primary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-destructive-assets-selected
        disabled:bg-buttons-colors-core-icon-destructive-background-resting disabled:border-buttons-colors-core-icon-destructive-stroke-resting disabled:text-buttons-colors-core-icon-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-destructive-assets-resting
      `,
      outline: `
        border-buttons-colors-core-icon-destructive-stroke-resting text-buttons-colors-link-destructive-text-resting [&_svg]:fill-buttons-colors-link-destructive-assets-resting
        hover:border-buttons-colors-core-icon-destructive-stroke-hover hover:text-buttons-colors-link-destructive-text-hover hover:[&_svg]:fill-buttons-colors-link-destructive-assets-hover
        focus-visible:border-buttons-colors-core-icon-destructive-stroke-selected focus-visible:text-buttons-colors-link-destructive-text-selected focus-visible:[&_svg]:fill-buttons-colors-link-destructive-assets-selected
        disabled:border-buttons-colors-core-icon-destructive-stroke-resting disabled:text-buttons-colors-link-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-link-destructive-assets-resting
      `,
      text: `
        text-buttons-colors-link-destructive-text-resting hover:text-buttons-colors-link-destructive-text-hover focus-visible:text-buttons-colors-link-destructive-text-selected
        [&_svg]:fill-buttons-colors-link-destructive-assets-resting hover:[&_svg]:fill-buttons-colors-link-destructive-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-destructive-assets-selected
        disabled:text-buttons-colors-link-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-link-destructive-assets-resting
      `,
      ghost: `
        bg-buttons-colors-core-icon-ghost-background-resting border-buttons-colors-core-icon-ghost-stroke-resting text-buttons-colors-core-icon-ghost-text-resting [&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
        hover:bg-buttons-colors-core-icon-destructive-background-hover hover:border-buttons-colors-core-icon-ghost-stroke-hover hover:text-buttons-colors-core-icon-ghost-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-hover
        focus-visible:bg-buttons-colors-core-icon-destructive-background-selected focus-visible:border-buttons-colors-core-icon-destructive-stroke-selected focus-visible:text-buttons-colors-core-icon-ghost-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-selected
        disabled:bg-buttons-colors-core-icon-ghost-background-resting disabled:border-buttons-colors-core-icon-ghost-stroke-resting disabled:text-buttons-colors-core-icon-ghost-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
      `,
      link: `
        text-buttons-colors-link-destructive-text-resting hover:text-buttons-colors-link-destructive-text-hover focus-visible:text-buttons-colors-link-destructive-text-selected
        [&_svg]:fill-buttons-colors-link-destructive-assets-resting hover:[&_svg]:fill-buttons-colors-link-destructive-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-destructive-assets-selected
        disabled:text-buttons-colors-link-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-link-destructive-assets-resting
        hover:border-b-buttons-colors-core-icon-destructive-stroke-hover
      `
    },
    error: {
      filled: `
        bg-buttons-colors-core-icon-destructive-background-resting border-buttons-colors-core-icon-destructive-stroke-resting text-buttons-colors-core-icon-destructive-text-resting [&_svg]:fill-buttons-colors-core-icon-destructive-assets-resting
        hover:bg-buttons-colors-core-icon-destructive-background-hover hover:border-buttons-colors-core-icon-destructive-stroke-hover hover:text-buttons-colors-core-icon-destructive-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-destructive-assets-hover
        focus-visible:bg-buttons-colors-core-icon-destructive-background-selected focus-visible:border-buttons-colors-core-icon-destructive-stroke-selected focus-visible:text-buttons-colors-core-icon-primary-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-destructive-assets-selected
        disabled:bg-buttons-colors-core-icon-destructive-background-resting disabled:border-buttons-colors-core-icon-destructive-stroke-resting disabled:text-buttons-colors-core-icon-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-destructive-assets-resting
      `,
      outline: `
        border-buttons-colors-core-icon-destructive-stroke-resting text-buttons-colors-link-destructive-text-resting [&_svg]:fill-buttons-colors-link-destructive-assets-resting
        hover:border-buttons-colors-core-icon-destructive-stroke-hover hover:text-buttons-colors-link-destructive-text-hover hover:[&_svg]:fill-buttons-colors-link-destructive-assets-hover
        focus-visible:border-buttons-colors-core-icon-destructive-stroke-selected focus-visible:text-buttons-colors-link-destructive-text-selected focus-visible:[&_svg]:fill-buttons-colors-link-destructive-assets-selected
        disabled:border-buttons-colors-core-icon-destructive-stroke-resting disabled:text-buttons-colors-link-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-link-destructive-assets-resting
      `,
      text: `
        text-buttons-colors-link-destructive-text-resting hover:text-buttons-colors-link-destructive-text-hover focus-visible:text-buttons-colors-link-destructive-text-selected
        [&_svg]:fill-buttons-colors-link-destructive-assets-resting hover:[&_svg]:fill-buttons-colors-link-destructive-assets-hover focus-visible:[&_svg]:fill-buttons-colors-link-destructive-assets-selected
        disabled:text-buttons-colors-link-destructive-text-resting disabled:[&_svg]:fill-buttons-colors-link-destructive-assets-resting
      `,
      ghost: `
        bg-buttons-colors-core-icon-ghost-background-resting border-buttons-colors-core-icon-ghost-stroke-resting text-buttons-colors-core-icon-ghost-text-resting [&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
        hover:bg-buttons-colors-core-icon-destructive-background-hover hover:border-buttons-colors-core-icon-ghost-stroke-hover hover:text-buttons-colors-core-icon-ghost-text-hover hover:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-hover
        focus-visible:bg-buttons-colors-core-icon-destructive-background-selected focus-visible:border-buttons-colors-core-icon-destructive-stroke-selected focus-visible:text-buttons-colors-core-icon-ghost-text-selected focus-visible:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-selected
        disabled:bg-buttons-colors-core-icon-ghost-background-resting disabled:border-buttons-colors-core-icon-ghost-stroke-resting disabled:text-buttons-colors-core-icon-ghost-text-resting disabled:[&_svg]:fill-buttons-colors-core-icon-ghost-assets-resting
      `
    }
  }
};
// endregion buttonTheme.ts

// region calendarTheme.ts
export const calendarTheme: CalendarTheme = {
  base: 'bg-calendar-colors-container-background-default relative overflow-hidden border rounded-(--calendar-details-corner-radius-default) border-calendar-colors-container-stroke-default [&>hr]:bg-calendar-colors-container-stroke-default',
  header: {
    base: 'flex gap-(--calendar-details-space-between-default) text-center justify-between py-(--calendar-details-vertical-padding-default) px-(--calendar-details-horizontal-padding-header) items-center text-calendar-colors-header-text-default',
    prev: 'text-lg leading-4 min-w-8 text-center text-buttons-colors-core-icon-ghost-assets-resting hover:text-buttons-colors-core-icon-ghost-assets-hover focus-visible:text-buttons-colors-core-icon-ghost-assets-hover',
    mid: 'group/calendar',
    next: 'text-lg leading-4 min-w-8 text-center text-buttons-colors-core-icon-ghost-assets-resting hover:text-buttons-colors-core-icon-ghost-assets-hover focus-visible:text-buttons-colors-core-icon-ghost-assets-hover'
  },
  title:
    'font-semibold text-base leading-8 text-calendar-colors-date-text-today group-hover/calendar:text-buttons-colors-core-icon-ghost-text-hover group-focus-visible/calendar:text-buttons-colors-core-icon-ghost-text-hover',
  content: 'flex pt-(--calendar-details-vertical-padding-inside)',
  days: {
    header:
      'pt-0 text-center grid grid-cols-7 gap-(--calendar-details-space-between-default) font-semibold text-calendar-colors-label-text-default px-(--calendar-details-horizontal-padding-content) pb-1',
    dayOfWeek:
      'flex items-center justify-center text-xs min-w-(--calendar-details-height-default) py-(--calendar-details-vertical-padding-inside)',
    week: 'grid grid-cols-7 gap-(--calendar-details-space-between-default) py-(--calendar-details-space-between-content) px-(--calendar-details-horizontal-padding-content) last:pb-(--calendar-details-horizontal-padding-content)',
    day: `
      font-normal text-xs flex p-(--calendar-details-vertical-padding-inside) rounded-(--calendar-details-corner-radius-default) size-(--calendar-details-height-default) border
      border-calendar-colors-date-stroke-resting focus-visible:border-calendar-colors-date-stroke-hover
      text-calendar-colors-date-text-resting focus-visible:text-calendar-colors-date-text-hover
      bg-calendar-colors-date-background-resting focus-visible:bg-calendar-colors-date-background-hover
    `,
    outside: 'opacity-40',
    startRangeDate: '',
    cornerStartDateBottom: '',
    endRangeDate: '',
    cornerEndDateTop: '',
    range: '',
    selected:
      'bg-calendar-colors-date-background-selected text-calendar-colors-date-text-selected',
    hover:
      'bg-calendar-colors-date-background-hover border-calendar-colors-date-stroke-hover text-calendar-colors-date-text-hover',
    today: 'border-calendar-colors-date-stroke-today'
  },
  months: {
    root: 'grid grid-cols-4 gap-(--calendar-details-space-between-default)',
    month: `
          font-normal text-xs flex p-(--calendar-details-vertical-padding-inside) rounded-(--calendar-details-corner-radius-default) border
          border-calendar-colors-date-stroke-resting hover:border-calendar-colors-date-stroke-hover focus-visible:border-calendar-colors-date-stroke-hover
          text-calendar-colors-date-text-resting hover:text-calendar-colors-date-text-hover focus-visible:text-calendar-colors-date-text-hover
          bg-calendar-colors-date-background-resting hover:bg-calendar-colors-date-background-hover focus-visible:bg-calendar-colors-date-background-hover
        `,
    selected:
      'bg-calendar-colors-date-background-selected text-calendar-colors-date-text-selected'
  },
  years: {
    root: 'grid grid-cols-4 gap-(--calendar-details-space-between-default)',
    year: `
      font-normal text-xs flex p-(--calendar-details-vertical-padding-inside) rounded-(--calendar-details-corner-radius-default) border
      border-calendar-colors-date-stroke-resting hover:border-calendar-colors-date-stroke-hover focus-visible:border-calendar-colors-date-stroke-hover
      text-calendar-colors-date-text-resting hover:text-calendar-colors-date-text-hover focus-visible:text-calendar-colors-date-text-hover
      bg-calendar-colors-date-background-resting hover:bg-calendar-colors-date-background-hover focus-visible:bg-calendar-colors-date-background-hover
    `,
    selected:
      'bg-calendar-colors-date-background-selected text-calendar-colors-date-text-selected'
  },
  time: {
    base: 'pr-(--calendar-details-space-between-content) flex flex-col h-full gap-0 text-xs text-buttons-colors-core-icon-ghost-assets-resting',
    wrapper: 'z-10 flex flex-row',
    dividerTop: 'hidden',
    dividerLeft:
      'h-auto mx-(--calendar-details-space-between-content) z-10 bg-calendar-colors-container-stroke-default mt-(--calendar-details-space-between-content)',
    header:
      'flex gap-(--calendar-details-space-between-default) px-0.5 pb-2.5 mb-2',
    column: {
      base: 'w-6',
      wrapper: 'overflow-y-auto h-52',
      label: 'text-center text-xs text-calendar-colors-label-text-default',
      list: 'p-0 m-0 list-none',
      scrollbar: ''
    },
    items: {
      wrapper:
        'flex flex-row flex-auto gap-0.25 h-full pt-(--calendar-details-vertical-padding-inside) h-46',
      container: 'h-full',
      list: 'relative h-full m-0 list-none overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none touch-pan-y',
      divider: 'mx-0 bg-calendar-colors-container-stroke-default',
      item: {
        base: 'bg-calendar-colors-date-background-resting py-(--calendar-details-space-between-content) px-(--spacing-padding-2xs) text-center select-none cursor-pointer rounded transition-colors duration-150 hover:text-buttons-colors-core-icon-ghost-assets-hover hover:bg-calendar-colors-date-background-hover',
        selected:
          'bg-calendar-colors-date-background-selected text-calendar-colors-date-text-selected',
        disabled:
          'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-calendar-colors-date-text-resting'
      }
    }
  },
  presets: {
    wrapper:
      'z-10 pl-(--calendar-details-vertical-padding-inside) py-(--calendar-details-space-between-content) items-start',
    divider:
      'mx-(--calendar-details-space-between-content) self-end bg-calendar-colors-container-stroke-default',
    base: 'relative max-w-52 pr-(--calendar-details-space-between-content) overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none touch-pan-y space-y-0 max-h-60',
    group:
      'text-xs font-medium my-(--calendar-details-space-between-content) !pr-0 !pl-0',
    item: {
      base: 'text-xs p-(--spacing-padding-2xs) my-(--spacing-padding-4xs) duration-0 text-select-menu-items-color-item-text-row-resting ',
      active: 'text-select-menu-items-color-item-text-row-selected'
    }
  }
};
// endregion calendarTheme.ts

// region calendarRangeTheme.ts
export type CalendarRangeTheme = Omit<CalendarTheme, 'months' | 'years'>;

const baseTheme: Partial<CalendarRangeTheme> = {
  base: 'relative overflow-hidden bg-calendar-colors-container-background-default',
  header: {
    base: 'flex text-center justify-between py-3 items-center text-calendar-colors-header-text-default',
    prev: 'text-calendar-colors-header-text-default',
    mid: 'text-calendar-colors-header-text-default',
    next: 'text-calendar-colors-header-text-default'
  },
  title: 'font-semibold flex grow justify-around',
  content: 'flex gap-4'
};

export const calendarRangeTheme: CalendarRangeTheme = {
  base: baseTheme.base,
  header: baseTheme.header,
  title: baseTheme.title,
  content: baseTheme.content,
  days: calendarTheme.days,
  time: calendarTheme.time,
  presets: {
    ...calendarTheme.presets,
    divider: 'mx-1 h-[calc(100%-30px)] self-end'
  }
};
// endregion calendarRangeTheme.ts

// region calloutTheme.ts
export const calloutTheme: CalloutTheme = {
  base: {
    common: 'px-(--spacing-padding-base) py-(--spacing-padding-sm) border-b',
    variant: {
      default:
        'bg-notifications-colors-background-neutral-resting border-notifications-colors-stroke-neutral-resting',
      success:
        'bg-notifications-colors-background-success-resting border-notifications-colors-stroke-success-resting',
      error:
        'bg-notifications-colors-background-error-resting border-notifications-colors-stroke-error-resting',
      warning:
        'bg-notifications-colors-background-warning-resting border-notifications-colors-stroke-warning-resting',
      info: 'bg-notifications-colors-background-info-resting border-notifications-colors-stroke-info-resting'
    }
  },
  icon: {
    common: '',
    variant: {
      default: 'text-notifications-colors-assets-neutral-resting',
      success: 'text-notifications-colors-assets-success-resting',
      error: 'text-notifications-colors-assets-destructive-resting',
      warning: 'text-notifications-colors-assets-warning-static',
      info: 'text-notifications-colors-assets-info-resting'
    }
  },
  text: 'text-notifications-colors-text-title-resting'
};
// endregion calloutTheme.ts

// region cardTheme.ts
export const cardTheme: CardTheme = {
  base: 'relative flex flex-col p-1.5 rounded-md bg-background-neutral-inverse-raised-4 border border-stroke-neutral-3',
  disablePadding: 'p-0',
  header: 'flex items-center',
  headerText: 'text-xs font-medium mt-0 mb-1',
  content: 'flex-1'
};
// endregion cardTheme.ts

// region checkboxTheme.ts
export const checkboxTheme: CheckboxTheme = {
  base: 'inline-flex items-center w-full group/checkbox',
  label: {
    base: 'ml-(--selectors-details-space-between-horizontal-sm) w-full text-selectors-colors-text-description-not-selected whitespace-nowrap',
    checked: 'checked text-selectors-colors-text-description-selected',
    disabled: 'cursor-not-allowed opacity-40',
    clickable: `
          cursor-pointer transition-colors
          group-hover/checkbox:text-selectors-colors-text-label-selected group-focus-within/checkbox:text-selectors-colors-text-label-selected
        `,
    sizes: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base'
    }
  },
  check: {
    base: 'stroke-selectors-colors-checkbox-selected-assets-base group-hover/checkbox:stroke-selectors-colors-checkbox-selected-assets-hover',
    checked: '',
    disabled: 'cursor-not-allowed'
  },
  border: {
    base: '',
    checked: '',
    disabled: 'cursor-not-allowed'
  },
  checkbox: {
    base: `
          flex items-center justify-center cursor-pointer border transition-colors focus-visible:outline-none
          bg-selectors-colors-checkbox-not-selected-background-resting group-hover/checkbox:bg-selectors-colors-checkbox-not-selected-background-hover group-focus-within/checkbox:bg-selectors-colors-checkbox-not-selected-background-hover
          border-selectors-colors-checkbox-not-selected-stroke-resting group-hover/checkbox:border-selectors-colors-checkbox-not-selected-stroke-hover group-focus-within/checkbox:border-selectors-colors-checkbox-not-selected-stroke-hover
          [&>svg>path:first-child]:stroke-transparent [&>svg]:fill-transparent [&>svg]:outline-none
        `,
    checked: `
          bg-selectors-colors-checkbox-selected-background-resting group-hover/checkbox:bg-selectors-colors-checkbox-selected-background-hover group-focus-within/checkbox:bg-selectors-colors-checkbox-selected-background-hover
          border-selectors-colors-checkbox-selected-stroke-resting group-hover/checkbox:border-selectors-colors-checkbox-selected-stroke-hover group-focus-within/checkbox:border-selectors-colors-checkbox-selected-stroke-hover
        `,
    disabled:
      'disabled cursor-not-allowed opacity-40 group-hover/checkbox:bg-selectors-colors-checkbox-selected-resting'
  },
  sizes: {
    small:
      '[&>svg]:size-(--selectors-details-width-radio-checkbox-sm) rounded-(--selectors-details-corner-radius-checkbox-sm)',
    medium:
      '[&>svg]:size-(--selectors-details-width-radio-checkbox-sm) rounded-(--selectors-details-corner-radius-checkbox-sm)',
    large:
      '[&>svg]:size-(--selectors-details-width-radio-checkbox-lg) rounded-(--selectors-details-corner-radius-checkbox-lg)'
  },
  boxVariants: {
    hover: {
      stroke: '',
      fill: '',
      strokeWidth: 1
    },
    pressed: {
      scale: 0.95
    },
    checked: {
      stroke: '',
      fill: ''
    },
    unchecked: {
      stroke: '',
      fill: ''
    }
  }
};
// endregion checkboxTheme.ts

// region chipTheme.ts
export const chipTheme: ChipTheme = {
  base: 'inline-flex whitespace-nowrap border font-medium select-none items-center justify-center rounded-(--badges-details-corner-radius-corner-radius) transition-colors outline-none',
  label: 'flex items-center gap-1',
  focus:
    'focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-2',
  variants: {
    filled: '',
    outline: '',
    subtle: '',
    'tag-filled': 'rounded-none cursor-pointer tag font-semibold',
    'tag-outline':
      'bg-transparent rounded-none cursor-pointer tag font-semibold'
  },
  colors: {
    default: {
      variants: {
        filled: `
          bg-badges-colors-solid-neutral-background-standard
          border-badges-colors-solid-neutral-stroke-default
          text-badges-colors-solid-neutral-text-default
          [&>svg]:fill-badges-colors-solid-neutral-assets-default
        `,
        outline: `
          bg-badges-colors-outline-neutral-background-standard
          border-badges-colors-outline-neutral-stroke-default
          text-badges-colors-outline-neutral-text-default
          [&>svg]:fill-badges-colors-outline-neutral-assets-default
          hover:bg-badges-colors-outline-neutral-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-neutral-background-standard
          border-badges-colors-subtle-neutral-stroke-default
          text-badges-colors-subtle-neutral-text-default
          [&>svg]:fill-badges-colors-subtle-neutral-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-neutral-background-resting
          border-tags-colors-neutral-stroke-resting
          text-tags-colors-neutral-text-label-base
          [&>svg]:text-tags-colors-neutral-assets-lead-icon-base
          hover:bg-tags-colors-neutral-background-hover
          hover:border-tags-colors-neutral-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-neutral-stroke-resting
          text-tags-colors-neutral-text-label-base
          [&>svg]:text-tags-colors-neutral-assets-lead-icon-base
          hover:border-tags-colors-neutral-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-brand-stroke-resting bg-tags-colors-brand-background-resting
              hover:border-tags-colors-brand-stroke-hover hover:bg-tags-colors-brand-background-hover
              focus-visible:border-tags-colors-brand-stroke-hover focus-visible:bg-tags-colors-brand-background-hover
              [&>svg]:text-tags-colors-brand-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-neutral-stroke-selected bg-tags-colors-neutral-background-selected
              hover:border-tags-colors-neutral-stroke-selected hover:bg-tags-colors-neutral-background-selected
            `
          }
        }
      }
    },
    primary: {
      variants: {
        filled: `
          bg-badges-colors-solid-brand-background-standard
          border-badges-colors-solid-brand-stroke-default
          text-badges-colors-solid-brand-text-default
          [&>svg]:fill-badges-colors-solid-brand-assets-default
        `,
        outline: `
          bg-badges-colors-outline-brand-background-standard
          border-badges-colors-outline-brand-stroke-default
          text-badges-colors-outline-brand-text-default
          [&>svg]:fill-badges-colors-outline-brand-assets-default
          hover:bg-badges-colors-outline-brand-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-brand-background-standard
          border-badges-colors-subtle-brand-stroke-default
          text-badges-colors-subtle-brand-text-default
          [&>svg]:fill-badges-colors-subtle-brand-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-brand-background-resting
          border-tags-colors-brand-stroke-resting
          text-tags-colors-brand-text-label-base
          [&>svg]:text-tags-colors-brand-assets-lead-icon-base
          hover:bg-tags-colors-brand-background-hover
          hover:border-tags-colors-brand-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-brand-stroke-resting
          text-tags-colors-brand-text-label-base
          [&>svg]:text-tags-colors-brand-assets-lead-icon-base
          hover:border-tags-colors-brand-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-brand-stroke-resting bg-tags-colors-brand-background-resting
              focus-visible:border-tags-colors-brand-stroke-hover
              [&>svg]:text-tags-colors-brand-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-brand-stroke-selected bg-tags-colors-brand-background-selected
              hover:border-tags-colors-brand-stroke-selected hover:bg-tags-colors-brand-background-selected
            `
          },
          'tag-filled': {
            base: '',
            selected: 'bg-tags-colors-brand-background-selected'
          }
        }
      }
    },
    secondary: {
      variants: {
        filled: `
          bg-badges-colors-solid-accent-background-standard
          border-badges-colors-solid-accent-stroke-default
          text-badges-colors-solid-accent-text-default
          [&>svg]:fill-badges-colors-solid-accent-assets-default
        `,
        outline: `
          bg-badges-colors-outline-accent-background-standard
          border-badges-colors-outline-accent-stroke-default
          text-badges-colors-outline-accent-text-default
          [&>svg]:fill-badges-colors-outline-accent-assets-default
          hover:bg-badges-colors-outline-accent-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-accent-background-standard
          border-badges-colors-subtle-accent-stroke-default
          text-badges-colors-subtle-accent-text-default
          [&>svg]:fill-badges-colors-subtle-accent-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-neutral-background-resting
          border-tags-colors-neutral-stroke-resting
          text-tags-colors-neutral-text-label-base
          [&>svg]:text-tags-colors-neutral-assets-lead-icon-base
          hover:bg-tags-colors-neutral-background-hover
          hover:border-tags-colors-neutral-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-neutral-stroke-resting
          text-tags-colors-neutral-text-label-base
          [&>svg]:text-tags-colors-neutral-assets-lead-icon-base
          hover:border-tags-colors-neutral-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-accent-stroke-resting bg-tags-colors-accent-background-resting
              focus-visible:bg-transparent bg-transparent hover:bg-transparent
              border-tags-colors-neutral-stroke-resting hover:border-tags-colors-neutral-stroke-hover
              focus-visible:border-tags-colors-accent-stroke-hover focus-visible:bg-tags-colors-accent-background-hover
              [&>svg]:text-tags-colors-accent-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-accent-stroke-selected bg-tags-colors-accent-background-selected
              hover:border-tags-colors-accent-stroke-selected hover:bg-tags-colors-accent-background-selected
            `
          },
          'tag-filled': {
            base: '',
            selected: 'bg-tags-colors-neutral-background-selected'
          }
        }
      }
    },
    success: {
      variants: {
        filled: `
          bg-badges-colors-solid-success-background-standard
          border-badges-colors-solid-success-stroke-default
          text-badges-colors-solid-success-text-default
          [&>svg]:fill-badges-colors-solid-success-assets-default
        `,
        outline: `
          bg-badges-colors-outline-success-background-standard
          border-badges-colors-outline-success-stroke-default
          text-badges-colors-outline-success-text-default
          [&>svg]:fill-badges-colors-outline-success-assets-default
          hover:bg-badges-colors-outline-success-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-success-background-standard
          border-badges-colors-subtle-success-stroke-default
          text-badges-colors-subtle-success-text-default
          [&>svg]:fill-badges-colors-subtle-success-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-success-background-resting
          border-tags-colors-success-stroke-resting
          text-tags-colors-success-text-label-base
          [&>svg]:text-tags-colors-success-assets-lead-icon-base
          hover:bg-tags-colors-success-background-hover
          hover:border-tags-colors-success-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-success-stroke-resting
          text-tags-colors-success-text-label-base
          [&>svg]:text-tags-colors-success-assets-lead-icon-base
          hover:border-tags-colors-success-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-success-stroke-resting bg-tags-colors-success-background-resting
              focus-visible:border-tags-colors-success-stroke-hover
              [&>svg]:text-tags-colors-success-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-success-stroke-selected bg-tags-colors-success-background-selected
              hover:border-tags-colors-success-stroke-selected hover:bg-tags-colors-success-background-selected
            `
          },
          'tag-filled': {
            base: '',
            selected:
              'bg-tags-colors-success-background-selected border-tags-colors-success-stroke-selected'
          }
        }
      }
    },
    warning: {
      variants: {
        filled: `
          bg-badges-colors-solid-warning-background-standard
          border-badges-colors-solid-warning-stroke-default
          text-badges-colors-solid-warning-text-default
          [&>svg]:fill-badges-colors-solid-warning-assets-default
        `,
        outline: `
          bg-badges-colors-outline-warning-background-standard
          border-badges-colors-outline-warning-stroke-default
          text-badges-colors-outline-warning-text-default
          [&>svg]:fill-badges-colors-outline-warning-assets-default
          hover:bg-badges-colors-outline-warning-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-warning-background-standard
          border-badges-colors-subtle-warning-stroke-default
          text-badges-colors-subtle-warning-text-default
          [&>svg]:fill-badges-colors-subtle-warning-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-warning-background-resting
          border-tags-colors-warning-stroke-resting
          text-tags-colors-warning-text-label-base
          [&>svg]:text-tags-colors-warning-assets-lead-icon-base
          hover:bg-tags-colors-warning-background-hover
          hover:border-tags-colors-warning-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-warning-stroke-resting
          text-tags-colors-warning-text-label-base
          [&>svg]:text-tags-colors-warning-assets-lead-icon-base
          hover:border-tags-colors-warning-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-warning-stroke-resting bg-tags-colors-warning-background-resting
              focus-visible:border-tags-colors-warning-stroke-hover
              [&>svg]:text-tags-colors-warning-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-warning-stroke-selected bg-tags-colors-warning-background-selected
              hover:border-tags-colors-warning-stroke-selected hover:bg-tags-colors-warning-background-selected
            `
          },
          'tag-filled': {
            base: '',
            selected:
              'bg-tags-colors-warning-background-selected border-tags-colors-warning-stroke-selected'
          }
        }
      }
    },
    error: {
      variants: {
        filled: `
          bg-badges-colors-solid-error-background-standard
          border-badges-colors-solid-error-stroke-default
          text-badges-colors-solid-error-text-default
          [&>svg]:fill-badges-colors-solid-error-assets-default
        `,
        outline: `
          bg-badges-colors-outline-error-background-standard
          border-badges-colors-outline-error-stroke-default
          text-badges-colors-outline-error-text-default
          [&>svg]:fill-badges-colors-outline-error-assets-default
          hover:bg-badges-colors-outline-error-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-error-background-standard
          border-badges-colors-subtle-error-stroke-default
          text-badges-colors-subtle-error-text-default
          [&>svg]:fill-badges-colors-subtle-error-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-error-background-resting
          border-tags-colors-error-stroke-resting
          text-tags-colors-error-text-label-base
          [&>svg]:text-tags-colors-error-assets-lead-icon-base
          hover:bg-tags-colors-error-background-hover
          hover:border-tags-colors-error-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-error-stroke-resting
          text-tags-colors-error-text-label-base
          [&>svg]:text-tags-colors-error-assets-lead-icon-base
          hover:border-tags-colors-error-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-error-stroke-resting bg-tags-colors-error-background-resting
              focus-visible:border-tags-colors-error-stroke-hover
              [&>svg]:text-tags-colors-error-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-error-stroke-selected bg-tags-colors-error-background-selected
              hover:border-tags-colors-error-stroke-selected hover:bg-tags-colors-error-background-selected
            `
          },
          'tag-filled': {
            base: '',
            selected:
              'bg-tags-colors-error-background-selected border-tags-colors-error-stroke-selected'
          }
        }
      }
    },
    info: {
      variants: {
        filled: `
          bg-badges-colors-solid-info-background-standard
          border-badges-colors-solid-info-stroke-default
          text-badges-colors-solid-info-text-default
          [&>svg]:fill-badges-colors-solid-info-assets-default
        `,
        outline: `
          bg-badges-colors-outline-info-background-standard
          border-badges-colors-outline-info-stroke-default
          text-badges-colors-outline-info-text-default
          [&>svg]:fill-badges-colors-outline-info-assets-default
          hover:bg-badges-colors-outline-info-background-standard
        `,
        subtle: `
          bg-badges-colors-subtle-info-background-standard
          border-badges-colors-subtle-info-stroke-default
          text-badges-colors-subtle-info-text-default
          [&>svg]:fill-badges-colors-subtle-info-assets-default
        `,
        'tag-filled': `
          bg-tags-colors-info-background-resting
          border-tags-colors-info-stroke-resting
          text-tags-colors-info-text-label-base
          [&>svg]:text-tags-colors-info-assets-lead-icon-base
          hover:bg-tags-colors-info-background-hover
          hover:border-tags-colors-info-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-info-stroke-resting
          text-tags-colors-info-text-label-base
          [&>svg]:text-tags-colors-info-assets-lead-icon-base
          hover:border-tags-colors-info-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-outline': {
            base: `
              border-tags-colors-info-stroke-resting bg-tags-colors-info-background-resting
              focus-visible:border-tags-colors-info-stroke-hover
              [&>svg]:text-tags-colors-info-assets-lead-icon-base
            `,
            selected: `
              border-tags-colors-info-stroke-selected bg-tags-colors-info-background-selected
              hover:border-tags-colors-info-stroke-selected hover:bg-tags-colors-info-background-selected
            `
          },
          'tag-filled': {
            base: '',
            selected:
              'bg-tags-colors-info-background-selected border-tags-colors-info-stroke-selected'
          }
        }
      }
    },
    accent: {
      variants: {
        filled: `
          border-black
          text-black
          [&>svg]:fill-black
        `,
        outline: `
          border-black
          text-black
          [&>svg]:fill-black
        `,
        subtle: `
          border-black
          text-black
          [&>svg]:fill-black
        `,
        'tag-filled': `
          bg-tags-colors-accent-background-resting
          border-tags-colors-accent-stroke-resting
          text-tags-colors-accent-text-label-base
          [&>svg]:text-tags-colors-accent-assets-lead-icon-base
          hover:bg-tags-colors-accent-background-hover
          hover:border-tags-colors-accent-stroke-hover
        `,
        'tag-outline': `
          border-tags-colors-accent-stroke-resting
          text-tags-colors-accent-text-label-base
          [&>svg]:text-tags-colors-accent-assets-lead-icon-base
          hover:border-tags-colors-accent-stroke-hover
        `
      },
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-filled': {
            base: '',
            selected: 'bg-tags-colors-accent-background-selected'
          }
        }
      }
    },
    minimal: {
      selectable: {
        base: 'hover:cursor-pointer',
        variants: {
          'tag-filled': {
            base: '',
            selected: 'bg-tags-colors-minimal-background-selected'
          }
        }
      }
    }
  },
  adornment: {
    base: 'flex items-center justify-center',
    start: '',
    end: '',
    sizes: {
      small:
        '[&>svg]:size-(--badges-details-asset-size-sm) [.tag>&>svg]:size-(--tags-details-asset-size-icon)',
      medium:
        '[&>svg]:size-(--badges-details-asset-size-md) [.tag>&>svg]:size-(--tags-details-asset-size-icon)',
      large:
        '[&>svg]:size-(--badges-details-asset-size-lg) [.tag>&>svg]:size-(--tags-details-asset-size-icon)'
    }
  },
  sizes: {
    small:
      'h-(--badges-details-height-sm) text-xs gap-(--badges-details-space-between-sm) px-(--badges-details-horizontal-padding-sm) [&.tag]:text-[10px] [&.tag]:px-2! [&.tag]:gap-(--tags-details-space-between-base)',
    medium:
      'h-(--badges-details-height-md) text-xs gap-(--badges-details-space-between-md) px-(--badges-details-horizontal-padding-md) [&.tag]:h-7 [&.tag]:px-2! [&.tag]:gap-(--tags-details-space-between-base)',
    large:
      'h-(--badges-details-height-lg) text-md gap-(--badges-details-space-between-lg) px-(--badges-details-horizontal-padding-lg) text-sm [&.tag]:h-8 [&.tag]:px-2! [&.tag]:gap-(--tags-details-space-between-base)'
  },
  deleteButton: {
    base: 'transition-colors ml-1 outline-none text-inherit hover:text-inherit',
    sizes: {
      small: 'size-2 [*>svg]:size-(--tags-details-asset-size-close)',
      medium: 'size-3 [*>svg]:size-(--tags-details-asset-size-close)',
      large: 'size-3 [*>svg]:size-(--tags-details-asset-size-close)'
    }
  },
  disabled: 'cursor-not-allowed opacity-50'
};
// endregion chipTheme.ts

// region collapseTheme.ts
export const collapseTheme: CollapseTheme = {
  base: 'will-change-[height,opacity] overflow-hidden'
};
// endregion collapseTheme.ts

// region commandPaletteTheme.ts
export const commandPaletteInputTheme: CommandPaletteInputTheme = {
  base: 'flex w-full items-center border-b-2 border-bottom border-stroke-neutral-1',
  input:
    'flex-1 border-0 box-border p-2.5 focus-within:outline-hidden focus-visible:outline-hidden',
  icon: 'w-4 h-4 ml-2.5'
};

export const commandPaletteItemTheme: CommandPaletteItemTheme = {
  base: 'transition-colors ease-in-out duration-200',
  active: 'bg-background-brand-base',
  clickable: 'cursor-pointer hover:bg-background-brand-base/70'
};

export const commandPaletteSectionTheme: CommandPaletteSectionTheme = {
  base: 'bg-background-neutral-inverse-raised-1',
  first: 'pt-2.5'
};

export const commandPaletteTheme: CommandPaletteTheme = {
  base: 'w-full border border-stroke-neutral-1',
  inner: 'max-h-[80vh] overflow-y-auto border-0',
  emptyContainer: '',
  input: commandPaletteInputTheme,
  item: commandPaletteItemTheme,
  section: commandPaletteSectionTheme
};
// endregion commandPaletteTheme.ts

// region contextMenuTheme.ts
export const contextMenuTheme: ContextMenuTheme = {
  enabled: 'cursor-context-menu'
};
// endregion contextMenuTheme.ts

// region dateFormatTheme.ts
export const dateFormatTheme: DateFormatTheme = {
  base: 'cursor-text',
  interactive: 'cursor-pointer hover:underline'
};
// endregion dateFormatTheme.ts

// region inputTheme.ts
export const inputTheme: InputTheme = {
  base: 'group/input flex relative flex-row items-center flex-nowrap transition-colors rounded-(--inputs-details-corner-radius-primary) bg-inputs-colors-normal-background-resting border border-inputs-colors-normal-stroke-resting hover:border-inputs-colors-normal-stroke-hover',
  focused:
    'border-inputs-colors-normal-stroke-selected bg-inputs-colors-normal-background-selected [&_svg]:fill-inputs-colors-normal-assets-input-selected!',
  input: `
    flex-1 font-normal font-sans bg-transparent border-0 p-0 m-0 disabled:pointer-events-none outline-hidden disabled:cursor-not-allowed disabled:text-content-text-neutral-5 transition-colors
    placeholder:text-inputs-colors-normal-text-input-text-resting focus:placeholder:text-inputs-colors-normal-text-input-text-selected
  `,
  inline: 'bg-transparent border-0 outline-hidden',
  disabled:
    'cursor-not-allowed opacity-40 hover:border-inputs-colors-normal-stroke-resting',
  fullWidth: 'w-full',
  error: `
    border-inputs-colors-error-stroke-resting bg-inputs-colors-error-background-resting [&>input]:text-inputs-colors-error-text-input-filled [&>input]:placeholder:text-inputs-colors-error-text-input-text-resting
    hover:border-inputs-colors-error-stroke-hover hover:bg-inputs-colors-error-background-hover
    focus-within:border-inputs-colors-error-stroke-selected focus-within:bg-inputs-colors-error-background-selected
  `,
  sizes: {
    small: `
      h-(--inputs-details-height-input-sm)
      pl-(--inputs-details-horizontal-padding-left-sm) pr-(--inputs-details-horizontal-padding-right-sm)
      gap-(--inputs-details-space-between-horizontal-sm)
      [&>input]:text-xs [&>input]:leading-4 [&_svg]:size-(--inputs-details-asset-size-sm)
    `,
    medium: `
      h-(--inputs-details-height-input-md)
      pl-(--inputs-details-horizontal-padding-left-md) pr-(--inputs-details-horizontal-padding-right-md)
      gap-(--inputs-details-space-between-horizontal-md)
      [&>input]:text-sm [&>input]:leading-4.5 [&_svg]:size-(--inputs-details-asset-size-md)
    `,
    large: `
      h-(--inputs-details-height-input-lg)
      pl-(--inputs-details-horizontal-padding-left-lg) pr-(--inputs-details-horizontal-padding-right-lg)
      gap-(--inputs-details-space-between-horizontal-lg)
      [&>input]:text-base [&>input]:leading-6 [&_svg]:size-(--inputs-details-asset-size-lg)
    `
  },
  adornment: {
    base: `
      flex items-center justify-center transition-colors
      [&>svg]:fill-inputs-colors-normal-assets-input-resting group-hover/input:[&>svg]:fill-inputs-colors-normal-assets-input-hover
    `,
    start: '',
    end: ''
  }
};
// endregion inputTheme.ts

// region dateinputTheme.ts
export const dateInputTheme: DateInputTheme = {
  input: inputTheme,
  calendar: calendarTheme,
  preset: {
    list: 'w-full',
    option: {
      base: '',
      active: ''
    }
  }
};
// endregion dateinputTheme.ts

// region dialogTheme.ts
export const dialogTheme: DialogTheme = {
  base: 'justify-center items-center flex pointer-events-none top-0 left-0 size-full fixed',
  inner: `
      flex flex-col box-border outline-0 pointer-events-auto overflow-auto max-w-[80vw] max-h-[80vh] rounded-(--notifications-details-corner-radius-primary) border backdrop-blur-lg
      border-stroke-brand-base bg-background-neutral-canvas-base
    `,
  content: 'p-4 flex-auto overflow-auto text-content-text-on-color-light-dark',
  footer: 'flex flex-row-reverse gap-2 p-4',
  header: {
    base: 'flex justify-between p-4',
    text: 'flex-1 m-0 p-0 inline-flex text-lg leading-6 font-bold text-content-text-on-color-light-dark',
    closeButton: `
      p-0 m-0 ml-[15px] size-auto inline-flex bg-none border-none cursor-pointer items-center text-[16px] focus:outline-hidden
      text-color-content-assets-neutral-base
    `
  }
};
// endregion dialogTheme.ts

// region dividerTheme.ts
export const dividerTheme: DividerTheme = {
  base: 'border-none',
  orientation: {
    horizontal: 'h-px w-full my-2.5',
    vertical: 'w-px h-full mx-2.5'
  },
  variant: {
    primary: 'bg-stroke-neutral-5',
    secondary: 'bg-linear-to-r from-transparent to-transparent via-blue-500'
  },
  disableMargins: 'my-0 mx-0'
};
// endregion dividerTheme.ts

// region dotsLoaderTheme.ts
export const dotsLoaderTheme: DotsLoaderTheme = {
  base: 'flex',
  dot: 'rounded-[50%] bg-background-brand-base',
  sizes: {
    small: 'size-1 m-1',
    medium: 'size-1.5 m-1.5',
    large: 'size-2 m-2'
  }
};
// endregion dotsLoaderTheme.ts

// region drawerTheme.ts
export const drawerTheme: DrawerTheme = {
  base: 'fixed overflow-y-auto overflow-x-hidden bg-background-neutral-raised-5/70',
  header: {
    base: 'flex items-center justify-between px-8 py-5 text-2xl font-bold',
    text: 'flex-1 m-0'
  },
  content: 'px-8 py-5 flex-1 overflow-auto',
  footer: 'flex px-8 py-5 mt-auto',
  disablePadding: 'p-0',
  closeButton: {
    base: 'opacity-80 h-auto w-auto min-w-[auto] min-h-[auto] cursor-pointer text-sm p-0 border-0 focus:outline-hidden',
    headerless: 'absolute right-5 top-5'
  },
  positions: {
    top: 'w-full inset-x-0 top-0',
    end: 'h-full inset-y-0 right-0',
    bottom: 'w-full inset-x-0 bottom-0',
    start: 'h-full inset-y-0 left-0'
  }
};
// endregion drawerTheme.ts

// region ellipsisTheme.ts
export const ellipsisTheme: EllipsisTheme = {
  dots: 'cursor-pointer opacity-50 text-[unset] p-0 border-[none] outline-hidden'
};
// endregion ellipsisTheme.ts

// region fieldTheme.ts
export const fieldTheme: FieldTheme = {
  base: 'mb-2.5',
  disableMargin: 'mb-0',
  label: 'text-sm',
  centerAlign: 'items-center',
  endAlign: 'items-end',
  horizontal: {
    base: 'flex flex-row items-baseline',
    label: 'mr-0.5 whitespace-nowrap',
    content: 'flex-1 min-w-0'
  },
  vertical: {
    base: 'block',
    label: 'block mb-0.5'
  },
  hint: 'text-xs text-text-secondary mt-1',
  error: 'text-xs text-error mt-1',
  errorState: ''
};
// endregion fieldTheme.ts

// region jsonTreeTheme.ts
export const jsonTreeTheme: JsonTreeTheme = {
  node: {
    label:
      'font-mono text-xs font-normal text-json-tree-color-text-primary-resting',
    delimiter: 'pr-1 text-xs font-normal',
    symbol: 'px-1 opacity-50 font-mono text-xs font-normal',
    value: 'text-json-tree-color-text-secondary-resting text-xs font-normal',
    count: 'opacity-50'
  },
  pager: 'opacity-50 cursor-pointer pl-4'
};
// endregion jsonTreeTheme.ts

// region kbdTheme.ts
export const kbdTheme: KbdTheme = {
  base: 'inline-flex gap-1 items-center',
  chip: 'whitespace-nowrap rounded-sm font-mono border-none bg-background-brand-3 text-content-text-neutral-base p-2!'
};
// endregion kbdTheme.ts

// region listTheme.tsx
export const listTheme: ListTheme = {
  base: 'flex flex-col gap-1 p-(--select-menu-items-details-horizontal-padding-container) text-navigation-colors-text-resting',
  header:
    'px-(--select-menu-items-details-horizontal-padding-header) py-(--select-menu-items-details-vertical-padding-base) border rounded-md border-select-menu-items-color-item-stroke-header-resting text-navigation-colors-text-static bg-select-menu-items-color-item-background-header-resting text-xs font-semibold',
  listItem: {
    base: 'items-center flex relative rounded-none flex-1 px-(--select-menu-items-details-horizontal-padding-row) py-(--spacing-padding-2xs) whitespace-break-spaces break-words border border-navigation-colors-stroke-row-items-resting rounded-md text-xs outline-none text-navigation-colors-text-resting',
    disabled:
      'cursor-not-allowed opacity-40 hover:border-select-menu-items-color-item-stroke-row-resting hover:bg-select-menu-items-color-item-stroke-row-resting text-navigation-colors-text-static',
    active:
      'border-navigation-colors-stroke-row-items-selected bg-navigation-colors-background-row-items-selected hover:border-navigation-colors-stroke-row-items-selected hover:bg-navigation-colors-background-row-items-selected text-navigation-colors-text-selected',
    clickable:
      'cursor-pointer hover:border-navigation-colors-stroke-row-items-hover hover:bg-navigation-colors-background-row-items-hover hover:text-navigation-colors-text-hover focus-visible:border-navigation-colors-stroke-row-items-hover focus-visible:bg-navigation-colors-background-row-items-hover focus-visible:text-navigation-colors-text-hover',
    disablePadding: 'p-0',
    disableGutters: 'px-0',
    dense: {
      base: 'px-(--spacing-padding-3xs)',
      content: '',
      start: 'pr-[calc(5/2)]',
      end: 'pl-[calc(5/2)]'
    },
    adornment: {
      base: 'items-center flex',
      start: 'pr-(--spacing-space-between-2xs)',
      end: 'pl-(--spacing-space-between-2xs)',
      svg: 'fill-current'
    },
    content: 'overflow-wrap break-word word-wrap break-all flex-1'
  }
};
// endregion listTheme.tsx

// region menuTheme.ts
export const menuTheme: MenuTheme = {
  base: 'relative min-w-[112px] max-w-[500px] border border-select-menu-items-color-item-stroke-container-resting rounded-md mt-2 bg-select-menu-items-color-item-background-container-base backdrop-blur-md',
  inner: 'focus:outline-hidden'
};
// endregion menuTheme.ts

// region navigationTheme.ts
export const navigationTheme: NavigationTheme = {
  bar: {
    base: `
    flex h-full w-full p-(--navigation-details-vertical-padding-base) border-r gap-(--navigation-details-space-between-sections-left-nav)
    bg-navigation-colors-background-container-base border-navigation-colors-stroke-container-base
  `,
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row border-none p-0'
    },
    start: 'py-4',
    navigation:
      'flex-1 flex gap-(--navigation-details-space-between-items-left-nav) overflow-auto',
    end: ''
  },
  button: {
    base: 'group relative shrink-0',
    variant: {
      ghost: {
        content: `
          w-full h-full outline-none relative z-10
          p-(--navigation-details-horizontal-padding-nav-item-main-row) rounded-(--navigation-details-corner-radius-row-item) border border-transparent text-navigation-colors-text-resting
          hover:text-navigation-colors-text-hover hover:bg-navigation-colors-background-row-items-hover hover:border-navigation-colors-stroke-row-items-hover
          focus-visible:text-navigation-colors-text-hover focus-visible:bg-navigation-colors-background-row-items-hover focus-visible:border-navigation-colors-stroke-row-items-hover
          transition-colors ease-out duration-300
        `,
        active: `
          text-navigation-colors-text-selected
          hover:text-navigation-colors-text-selected
          focus-visible:text-navigation-colors-text-selected
        `,
        selection: `
          absolute z-1 top-0 left-0 w-full h-full rounded-(--navigation-details-corner-radius-row-item) border
          border-navigation-colors-stroke-row-items-selected bg-navigation-colors-background-row-items-selected
          hover:border-navigation-colors-stroke-row-items-selected hover:bg-navigation-colors-background-row-items-selected
          focus-visible:border-navigation-colors-stroke-row-items-selected focus-visible:bg-navigation-colors-background-row-items-selected
        `,
        disabled: `
          opacity-40 cursor-not-allowed font-normal text-navigation-colors-text-resting bg-transparent border-transparent
          hover:text-navigation-colors-text-resting hover:bg-transparent hover:border-transparent
        `
      },
      underline: {
        content: `
          h-(--navigation-details-height-width-items-side-nav)
          relative z-10 p-(--navigation-details-horizontal-padding-nav-item-main-row) outline-none
          text-navigation-colors-text-resting
          hover:text-navigation-colors-text-hover
          focus-visible:text-navigation-colors-text-hover
          transition-colors ease-out duration-300
        `,
        active: `
          font-semibold
          text-navigation-colors-text-selected
          hover:text-navigation-colors-text-selected
          focus-visible:text-navigation-colors-text-selected
        `,
        selection: `
          absolute z-1 bottom-0 w-full h-0.5 rounded-(--navigation-details-corner-radius-row-item) bg-navigation-colors-stroke-detail-line-active
        `,
        disabled: `
          opacity-40 cursor-not-allowed font-normal text-navigation-colors-text-resting bg-transparent border-transparent
          hover:text-navigation-colors-text-resting hover:bg-transparent hover:border-transparent
        `
      }
    }
  }
};
// endregion navigationTheme.ts

// region notificationTheme.ts
export const notificationTheme: NotificationTheme = {
  container: '',
  positions:
    'fixed z-9998 h-auto -translate-x-2/4 mb-1 px-24 py-0 left-2/4 bottom-0',
  notification: {
    base: `
          flex relative text-sm min-w-[400px] rounded-(--notifications-details-corner-radius-primary)
          mb-2.5 p-(--notifications-details-vertical-padding-standard-sm) border backdrop-blur-xl transition-colors
          border-notifications-colors-stroke-neutral-resting hover:border-notifications-colors-stroke-neutral-hover
          bg-notifications-colors-background-neutral-resting hover:bg-notifications-colors-background-neutral-hover
        `,
    variants: {
      success: {
        base: `
          border-notifications-colors-stroke-success-resting hover:border-notifications-colors-stroke-success-hover
          bg-notifications-colors-background-success-resting hover:bg-notifications-colors-background-success-hover
        `,
        icon: 'text-notifications-colors-assets-success-resting size-(--notifications-details-asset-size-base)'
      },
      error: {
        base: `
          border-notifications-colors-stroke-error-resting hover:border-notifications-colors-stroke-error-hover
          bg-notifications-colors-background-error-resting hover:bg-notifications-colors-background-error-hover
        `,
        icon: 'text-notifications-colors-assets-destructive-resting size-(--notifications-details-asset-size-base)'
      },
      warning: {
        base: `
          border-notifications-colors-stroke-warning-resting hover:border-notifications-colors-stroke-warning-hover
          bg-notifications-colors-background-warning-resting hover:bg-notifications-colors-background-warning-hover
        `,
        icon: 'text-notifications-colors-assets-warning-static size-(--notifications-details-asset-size-base)'
      },
      info: {
        base: `
          border-notifications-colors-stroke-info-resting hover:border-notifications-colors-stroke-info-hover
          bg-notifications-colors-background-info-resting hover:bg-notifications-colors-background-info-hover
        `,
        icon: 'text-notifications-colors-assets-info-resting size-(--notifications-details-asset-size-base)'
      }
    },
    content: 'inline-flex items-start flex-1 flex-col justify-center',
    header:
      'text-sm flex gap-(--notifications-details-space-between-standard-sm) items-center text-notifications-colors-text-title-resting',
    closeContainer: 'inline-flex items-center',
    action:
      'ml-auto mr-(--notifications-details-space-between-standard-sm) items-center flex',
    closeButton: `
      size-(--notifications-details-asset-size-compact) cursor-pointer text-xs font-semibold
      m-0 border-0 text-notifications-colors-assets-normal-resting hover:opacity-70 transition-opacity
    `,
    body: 'text-xxs mt-(--notifications-details-space-between-standard-sm) text-notifications-colors-text-normal-resting'
  }
};
// endregion notificationTheme.ts

// region pagerTheme.ts
export const pagerTheme: PagerTheme = {
  base: 'items-center flex user-select-none gap-5',
  pages: {
    base: 'inline-flex items-center gap-1 text-sm',
    page: {
      base: `
        text-xs text-buttons-colors-core-icon-ghost-text-resting py-2 min-w-8 transition-colors border
        bg-buttons-colors-core-icon-ghost-background-resting hover:bg-buttons-colors-core-icon-ghost-background-hover focus-visible:bg-buttons-colors-core-icon-ghost-background-hover
        border-buttons-colors-core-icon-ghost-stroke-resting hover:border-buttons-colors-core-icon-ghost-stroke-hover focus-visible:border-buttons-colors-core-icon-ghost-stroke-hover
      `,
      active:
        'text-buttons-colors-core-icon-ghost-text-selected font-bold disabled:cursor-default disabled:opacity-100 disabled:bg-buttons-colors-core-icon-ghost-background-selected disabled:text-buttons-colors-core-icon-ghost-text-selected'
    }
  },
  ellipsis:
    'cursor-pointer text-buttons-colors-core-icon-ghost-text-resting min-w-8 flex items-baseline justify-center leading-8',
  pagerDisplayItems: 'text-xs',
  itemsDisplay: 'text-buttons-colors-core-icon-ghost-text-selected font-sm',
  showPageRange: '',
  totalCount: '',
  control: `
    min-size-8 p-2 [&>svg]:size-4 text-buttons-colors-core-icon-secondary-assets-resting transition-colors border
    bg-buttons-colors-core-icon-secondary-background-resting hover:bg-buttons-colors-core-icon-secondary-background-hover focus-visible:bg-buttons-colors-core-icon-secondary-background-hover disabled:bg-buttons-colors-core-icon-secondary-background-resting
    border-buttons-colors-core-icon-secondary-stroke-resting hover:border-buttons-colors-core-icon-secondary-stroke-hover focus-visible:border-buttons-colors-core-icon-secondary-stroke-hover disabled:border-buttons-colors-core-icon-secondary-stroke-resting
  `,
  firstPage: '',
  prevPage: '',
  lastPage: '',
  nextPage: ''
};
// endregion pagerTheme.ts

// region popoverTheme.ts
export const popoverTheme: PopoverTheme = {
  base: 'whitespace-nowrap text-center will-change-[transform,opacity] p-1.5 rounded-sm',
  disablePadding: 'p-0'
};
// endregion popoverTheme.ts

// region radioTheme.ts
export const radioTheme: RadioTheme = {
  base: 'box-border leading-none group',
  radio: {
    base: `
          inline-flex justify-center items-center align-middle rounded-full cursor-pointer transition-colors border focus-visible:outline-none
          bg-selectors-colors-radio-not-selected-background-resting group-hover:bg-selectors-colors-radio-not-selected-background-hover group-focus-within:bg-selectors-colors-radio-not-selected-background-hover
          border-selectors-colors-radio-not-selected-stroke-resting group-hover:border-selectors-colors-radio-not-selected-stroke-hover group-focus-within:border-selectors-colors-radio-not-selected-stroke-hover
        `,
    checked: `
          bg-selectors-colors-radio-selected-background-resting group-hover:bg-selectors-colors-radio-selected-background-hover group-focus-within:bg-selectors-colors-radio-selected-background-hover
          border-selectors-colors-radio-selected-stroke-resting group-hover:border-selectors-colors-radio-selected-stroke-hover group-focus-within:border-selectors-colors-radio-selected-stroke-hover
        `,
    disabled:
      'cursor-not-allowed opacity-40 group-hover:bg-inherit group-focus-within:bg-inherit'
  },
  indicator: {
    base: 'rounded-full bg-selectors-colors-radio-selected-assets-base',
    disabled: 'cursor-not-allowed',
    sizes: {
      small: 'size-(--selectors-details-asset-size-radio-checkbox-sm)',
      medium: 'size-(--selectors-details-asset-size-radio-checkbox-sm)',
      large: 'size-(--selectors-details-asset-size-radio-checkbox-lg)'
    }
  },
  label: {
    base: 'w-full align-middle ml-(--selectors-details-space-between-horizontal-sm) text-selectors-colors-text-label-not-selected',
    clickable:
      'cursor-pointer group-hover:text-selectors-colors-text-label-selected group-focus-within:text-selectors-colors-text-label-selected',
    disabled: 'cursor-not-allowed opacity-40',
    checked: 'text-selectors-colors-text-label-selected'
  },
  sizes: {
    small: 'size-(--selectors-details-width-radio-checkbox-sm)',
    medium: 'size-(--selectors-details-width-radio-checkbox-sm)',
    large:
      'size-(--selectors-details-width-radio-checkbox-lg) p-(--selectors-details-vertical-padding-lg)'
  }
};
// endregion radioTheme.ts

// region rangeTheme.ts
export const rangeTheme: RangeTheme = {
  base: `
        group relative box-border w-full h-(--selectors-details-height-range-bar) rounded-sm transition-colors
        bg-selectors-colors-range-bar-background-base hover:bg-selectors-colors-range-bar-background-hover focus-within:bg-selectors-colors-range-bar-background-active
      `,
  drag: `
        absolute size-(--selectors-details-height-range-handle) -left-1.5 -top-1.5 rounded-sm border
        border-selectors-colors-range-handles-stroke-resting hover:border-selectors-colors-range-handles-stroke-hover focus-visible:border-selectors-colors-range-handles-stroke-active
        bg-selectors-colors-range-handles-background-resting hover:bg-selectors-colors-range-handles-background-hover focus-visible:hover:bg-selectors-colors-range-handles-background-active
      `,
  inputWrapper: {
    base: 'cursor-pointer inline-block relative size-full',
    disabled: 'cursor-not-allowed'
  },
  rangeHighlight: {
    base: 'pointer-events-none h-(--selectors-details-height-range-bar) bg-selectors-colors-range-bar-background-active-section rounded-sm',
    disabled: 'cursor-not-allowed'
  },
  disabled:
    'cursor-not-allowed opacity-40 disabled:bg-selectors-colors-range-bar-background-base!',
  input: 'absolute left-[-9999px]',
  tooltip:
    'absolute top-[-45px] whitespace-nowrap text-center text-xs font-semibold left-2/4 rounded-sm p-(--spacing-padding-xs) bg-tooltip-colors-neutral-background-default text-tooltip-colors-neutral-text-default'
};
// endregion rangeTheme.ts

// region redactTheme.ts
export const redactTheme: RedactTheme = {
  base: 'cursor-text',
  interactive: 'cursor-pointer hover:underline'
};
// endregion redactTheme.ts

// region selectTheme.ts
export const selectTheme: SelectTheme = {
  selectInput: {
    base: 'flex flex-nowrap items-center box-border border rounded-md border-inputs-colors-normal-stroke-resting bg-inputs-colors-normal-background-resting hover:border-inputs-colors-normal-stroke-hover focus-within:border-inputs-colors-normal-stroke-selected focus-within:bg-inputs-colors-normal-background-selected',
    container: 'relative',
    inputContainer:
      'flex-wrap flex items-center overflow-hidden flex-1 max-w-full [&>div]:max-w-full [&_.invisible]:text-ellipsis [&_.invisible]:overflow-hidden [&_.invisible]:invisible',
    input:
      'p-0 bg-transparent text-ellipsis align-middle max-w-full read-only:cursor-not-allowed focus:outline-hidden disabled:text-content-text-neutral-5 text-inputs-colors-normal-text-input-text-resting',
    placeholder:
      'placeholder:text-inputs-colors-normal-text-input-text-resting focus:placeholder:text-inputs-colors-normal-text-input-text-selected',
    selectedValue:
      'overflow-hidden whitespace-nowrap text-ellipsis flex flex-wrap',
    adornment: {
      start:
        'flex items-center mr-(--inputs-details-space-between-horizontal-md)',
      end: 'flex items-center ml-(--inputs-details-space-between-horizontal-md)'
    },
    actions: {
      container: 'flex items-center justify-center',
      button:
        'disabled:cursor-not-allowed focus-visible:outline-none [&_svg]:text-buttons-colors-core-icon-ghost-assets-resting focus-visible:[&_svg]:text-buttons-colors-core-icon-ghost-assets-selected',
      refresh:
        'mr-1.5 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-inputs-colors-normal-assets-input-resting',
      loader: 'mr-2.5',
      close:
        'mr-1.5 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-inputs-colors-normal-assets-input-resting',
      expand:
        '[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-inputs-colors-normal-assets-input-resting'
    },
    disabled:
      'cursor-not-allowed text-content-text-neutral-5 hover:after:content-none opacity-40',
    unfilterable: 'caret-transparent',
    error: `
      border-inputs-colors-error-stroke-resting bg-inputs-colors-error-background-resting [&>input]:text-inputs-colors-error-text-input-filled [&>input]:placeholder:text-inputs-colors-error-text-input-text-resting
      hover:border-inputs-colors-error-stroke-hover hover:bg-inputs-colors-error-background-hover
      focus-within:border-inputs-colors-error-stroke-selected focus-within:bg-inputs-colors-error-background-selected
    `,
    open: 'rounded-sm',
    single: {
      selectedValue:
        'overflow-hidden whitespace-nowrap text-ellipsis max-w-full',
      inputContainer: 'flex-nowrap',
      input: 'max-w-full'
    },
    multiple: {
      selectedValue: 'contents',
      inputContainer: 'flex-wrap'
    },
    chip: {
      base: 'cursor-pointer flex text-xs leading-none box-border mr-(--spacing-space-between-2xs) px-(--spacing-padding-3xs) py-(--spacing-padding-3xs) rounded-sm border-solid border-transparent',
      hover: '',
      focused: 'focused:border-transparent focused:outline-none',
      disabled: 'disabled:cursor-not-allowed',
      removeButton:
        'cursor-pointer leading-0 ml-(--spacing-space-between-2xs) p-0 border-0 [&>svg]:w-3 [&>svg]:h-3 [&>svg]:align-baseline [&>svg]:pointer-events-none'
    },
    size: {
      small:
        'text-xs [&_input]:leading-4 [&_svg]:size-4 px-(--inputs-details-horizontal-padding-left-sm) min-h-(--inputs-details-height-input-sm) gap-(--inputs-details-space-between-horizontal-sm)',
      medium:
        'text-sm [&_input]:leading-4 [&_svg]:size-4 px-(--inputs-details-horizontal-padding-left-md) min-h-(--inputs-details-height-input-md) gap-(--inputs-details-space-between-horizontal-md)',
      large:
        'text-base [&_svg]:size-4.5 px-(--inputs-details-horizontal-padding-left-lg) min-h-(--inputs-details-height-input-lg) gap-(--inputs-details-space-between-horizontal-lg)'
    }
  },
  selectMenu: {
    base: 'border border-select-menu-items-color-item-stroke-container-resting rounded-md mt-(--spacing-space-between-xs) bg-select-menu-items-color-item-background-container-base backdrop-blur-md min-w-[112px] max-h-[300px] overflow-y-auto text-left box-border [&>div]:gap-0.5',
    groupItem: {
      base: 'p-0',
      title:
        'px-(--select-menu-items-details-horizontal-padding-header) py-(--select-menu-items-details-vertical-padding-base) border rounded-md border-select-menu-items-color-item-stroke-header-resting text-select-menu-items-color-item-text-header-resting bg-select-menu-items-color-item-background-header-resting text-xxs font-semibold',
      size: { small: '', medium: '', large: '' }
    },
    option: {
      base: 'flex-1 whitespace-break-spaces break-words border border-select-menu-items-color-item-stroke-row-resting rounded-md text-select-menu-items-color-item-text-row-resting',
      hover:
        'hover:border-select-menu-items-color-item-stroke-row-hover hover:bg-select-menu-items-color-item-background-row-hover hover:text-select-menu-items-color-item-text-row-selected',
      selected:
        'border-select-menu-items-color-item-stroke-row-selected bg-select-menu-items-color-item-background-row-selected hover:border-select-menu-items-color-item-stroke-row-selected hover:bg-select-menu-items-color-item-background-row-selected',
      active:
        'border-select-menu-items-color-item-stroke-row-hover bg-select-menu-items-color-item-background-row-hover',
      disabled:
        'hover:border-select-menu-items-color-item-stroke-row-resting hover:bg-select-menu-items-color-item-stroke-row-resting',
      checkIcon: 'ml-1',
      content: 'flex flex-row justify-between'
    },
    size: {
      small:
        'text-xs px-(--spacing-padding-xs) py-(--select-menu-items-details-vertical-padding-base)',
      medium:
        'text-xs px-(--select-menu-items-details-horizontal-padding-row) py-(--select-menu-items-details-vertical-padding-base)',
      large:
        'text-sm px-(--select-menu-items-details-horizontal-padding-row) py-(--select-menu-items-details-vertical-padding-base)'
    }
  }
};
// endregion selectTheme.ts

// region skeletonTheme.ts
export const skeletonTheme: SkeletonTheme = {
  base: 'rounded-md bg-background-neutral-raised-4',
  animated:
    'animate-[pulse_1.5s_ease-in-out_infinite] bg-gradient-to-r from-background-neutral-raised-3 via-background-neutral-raised-4 to-background-neutral-raised-3 bg-[length:200%_100%]',
  variants: {
    text: 'h-4 w-full',
    rounded: 'rounded-full w-10 h-10',
    rectangle: 'h-24 w-full',
    square: 'w-24 h-24'
  }
};
// endregion skeletonTheme.ts

// region sortTheme.ts
export const sortTheme: SortTheme = {
  base: 'cursor-pointer select-none flex items-center relative',
  disabled: 'cursor-default',
  hasValue: 'cursor-not-allowed',
  icon: {
    base: 'w-4 h-4 align-middle mx-1.5 fill-current',
    ascending: 'rotate-180'
  }
};
// endregion sortTheme.ts

// region stepperTheme.tsx
export const stepperTheme: StepperTheme = {
  base: 'grid grid-cols-[min-content_1fr] gap-x-3',
  step: {
    base: 'border-l border-solid border-stroke-neutral-2 translate-x-1/2 mt-4 relative',
    marker: {
      base: 'rounded-full w-2.5 h-2.5 bg-content-assets-neutral-3',
      container:
        'text-content-text-on-color-light-dark w-max bg-background-neutral-canvas-base/90 rounded-full relative -translate-x-[calc(50%+0.5px)] -top-3',
      active: 'border border-stroke-brand-1 bg-background-brand-base',
      label: {
        base: 'flex flex-row items-center gap-1 border border-content-assets-neutral-3 px-3 py-1 rounded-[20px]',
        active: 'border-stroke-brand-1 bg-background-brand-5'
      }
    },
    active: 'border-stroke-brand-1',
    content: 'pb-6'
  }
};
// endregion stepperTheme.tsx

// region tabsTheme.ts
export const tabsTheme: TabsTheme = {
  base: 'flex flex-col',
  list: {
    base: 'flex text-center flex-wrap -mb-px border-b border-stroke-neutral-5',
    indicator: {
      base: 'bg-tabs-colors-underline-stroke-selected group-hover:bg-tabs-colors-underline-stroke-selected-hover absolute bottom-0 left-0 right-0 transition-colors',
      size: {
        small: 'h-(--tabs-details-stroke-width-underline-sm)',
        medium: 'h-(--tabs-details-stroke-width-underline-sm)',
        large: 'h-(--tabs-details-stroke-width-underline-lg)'
      }
    },
    divider: 'w-full h-px border-0 !-mb-1',
    variant: {
      primary: {
        divider: ''
      },
      secondary: {
        divider: ''
      }
    },
    tab: {
      base: 'group relative',
      button: `
        transition-colors [&_svg]:transition-colors
        text-tabs-colors-underline-text-resting border-tabs-colors-underline-background-resting border-b rounded-none
        hover:border-tabs-colors-underline-background-hover hover:text-tabs-colors-underline-text-hover
        focus-visible:text-tabs-colors-underline-text-hover
        [&_svg]:text-tabs-colors-underline-assets-resting hover:[&_svg]:text-tabs-colors-underline-assets-hover focus-visible:[&_svg]:text-tabs-colors-underline-assets-hover
      `,
      selected:
        'text-tabs-colors-underline-text-selected group-hover:text-tabs-colors-underline-text-selected-hover [&_svg]:text-tabs-colors-underline-assets-selected',
      disabled:
        'cursor-not-allowed opacity-40 disabled:text-tabs-colors-underline-text-resting hover:text-tabs-colors-underline-text-resting disabled:[&_svg]:text-tabs-colors-underline-assets-resting',
      size: {
        small:
          'h-(--tabs-details-height-sm) px-(--tabs-details-horizontal-padding-sm) text-[10px] font-semibold',
        medium:
          'h-(--tabs-details-height-lg) px-(--tabs-details-horizontal-padding-sm) text-xs font-semibold',
        large:
          'h-(--tabs-details-height-lg) px-(--tabs-details-horizontal-padding-lg) text-sm font-semibold'
      }
    }
  },
  panel: 'mt-4'
};
// endregion tabsTheme.ts

// region textAreaTheme.ts
export const textareaTheme: TextareaTheme = {
  base: `
    flex items-center transition-colors rounded-md border
    border-inputs-colors-normal-stroke-resting bg-inputs-colors-normal-background-resting
    hover:border-inputs-colors-normal-stroke-hover hover:bg-inputs-colors-normal-background-hover
    focus-within:border-inputs-colors-normal-stroke-selected focus-within:bg-inputs-colors-normal-background-selected
    disabled-within:hover:border-inputs-colors-normal-stroke-resting disabled-within:hover:bg-inputs-colors-normal-background-resting
  `,
  input: `
    border-0 resize-none read-only:cursor-not-allowed outline-hidden transition-colors
    text-inputs-colors-normal-text-input-text-resting
    placeholder:text-inputs-colors-normal-text-input-text-resting focus:placeholder:text-inputs-colors-normal-text-input-text-selected
  `,
  fullWidth: 'w-full',
  error: `
    border-inputs-colors-error-stroke-resting bg-inputs-colors-error-background-resting
    hover:border-inputs-colors-error-stroke-hover hover:bg-inputs-colors-error-background-hover
    focus-within:border-inputs-colors-error-stroke-selected focus-within:bg-inputs-colors-error-background-selected
    disabled-within:hover:border-inputs-colors-error-stroke-resting disabled-within:hover:bg-inputs-colors-error-background-resting
    [&>textarea]:text-inputs-colors-error-text-input-filled [&>textarea]:placeholder:text-inputs-colors-error-text-input-text-resting
  `,
  disabled: 'cursor-not-allowed opacity-40',
  sizes: {
    small: `
      text-xs
      pl-(--inputs-details-horizontal-padding-left-sm) pr-(--inputs-details-horizontal-padding-right-sm)
      py-[3px]
    `,
    medium: `
      text-sm
      pl-(--inputs-details-horizontal-padding-left-md) pr-(--inputs-details-horizontal-padding-right-md)
      py-[7px]
    `,
    large: `
      text-base
      pl-(--inputs-details-horizontal-padding-left-lg) pr-(--inputs-details-horizontal-padding-right-lg)
      py-[7px]
    `
  }
};
// endregion textAreaTheme.ts

// region toogleTheme.ts
export const toggleTheme: ToggleTheme = {
  base: 'group/toggle flex items-center justify-start cursor-pointer bg-selectors-colors-toggle-off-background-resting box-border border border-selectors-colors-toggle-off-stroke-resting rounded-full hover:bg-selectors-colors-toggle-off-background-hover focus-visible:bg-selectors-colors-toggle-off-background-hover transition-colors ease-in-out duration-300 focus-visible:outline-none',
  disabled:
    'cursor-not-allowed opacity-40 focus-visible:bg-selectors-colors-toggle-off-background-resting',
  checked:
    'justify-end bg-selectors-colors-toggle-on-background-resting hover:bg-selectors-colors-toggle-on-background-hover focus-visible:bg-selectors-colors-toggle-on-background-hover',
  disabledAndChecked:
    'focus-visible:bg-selectors-colors-toggle-on-background-resting',
  handle: {
    base: 'rounded-full bg-selectors-colors-toggle-off-assets-resting group-hover/toggle:bg-selectors-colors-toggle-off-assets-hover',
    sizes: {
      small: 'size-(--selectors-details-asset-size-toggle-sm)',
      medium: 'size-(--selectors-details-asset-size-toggle-sm)',
      large: 'size-(--selectors-details-asset-size-toggle-lg)'
    },
    disabled: '',
    disabledAndChecked: 'bg-selectors-colors-toggle-on-assets-resting'
  },
  sizes: {
    small:
      'w-(--selectors-details-width-toggle-sm) h-(--selectors-details-height-sm) p-(--selectors-details-vertical-padding-lg)',
    medium:
      'w-(--selectors-details-width-toggle-sm) h-(--selectors-details-height-sm) p-(--selectors-details-vertical-padding-lg)',
    large:
      'w-(--selectors-details-width-toggle-lg) h-(--selectors-details-height-lg) p-(--selectors-details-vertical-padding-lg)'
  }
};
// endregion toogleTheme.ts

// region tooltipTheme.ts
export const tooltipTheme: TooltipTheme = {
  base: 'whitespace-nowrap text-center will-change-[transform,opacity] p-(--tooltip-details-horizontal-padding-sm) rounded-sm bg-tooltip-colors-neutral-background-default text-tooltip-colors-neutral-text-default',
  disablePointer: 'pointer-events-none',
  arrow: 'w-2 h-2 rotate-45 bg-inherit'
};
// endregion tooltipTheme.ts

// region treeTheme.ts
export const treeTheme: TreeTheme = {
  base: 'relative m-0 p-0 list-none',
  tree: 'border pt-1 pb-1 px-3 border-solid border-transparent',
  arrow:
    'size-4.5 p-1 transition-colors text-json-tree-color-asset-resting hover:text-json-tree-color-asset-hover',
  node: {
    base: 'pt-2 m-0 list-style-none first:pt-0 last:pb-0',
    collapsed: '-rotate-90',
    disabled: 'opacity-40',
    leaf: 'pl-5.5',
    label: 'flex items-center',
    button: {
      base: 'min-w-[auto] min-h-[auto] size-auto transition-transform duration-100 ease-in-out ml-0 mr-1 my-0 p-0',
      icon: 'align-middle block h-2 w-2 m-0.5'
    }
  },
  nodeBlock: 'flex items-center',
  subtree: 'relative ml-5 mr-0 mt-1 mb-0 p-0'
};
// endregion treeTheme.ts

// region typographyTheme.ts
export const typographyTheme: TypographyTheme = {
  h1: 'scroll-m-20 font-sans text-8xl font-normal tracking-tight text-balance text-content-text-neutral-base',
  h2: 'scroll-m-20 border-b border-surface pb-2 font-sans text-6xl font-normal tracking-tight first:mt-0 text-content-text-neutral-base',
  h3: 'scroll-m-20 font-sans text-4xl font-normal tracking-tight text-content-text-neutral-base',
  h4: 'scroll-m-20 font-sans text-2xl font-normal tracking-tight text-content-text-neutral-base',
  h5: 'scroll-m-20 font-sans text-lg font-normal tracking-tight text-content-text-neutral-base',
  h6: 'scroll-m-20 font-sans text-base font-normal tracking-tight text-content-text-neutral-base',
  p: 'font-serif text-sm font-normal leading-7 [&:not(:first-child)]:mt-6 text-content-text-neutral-base',
  blockquote:
    'mt-6 border-l-2 border-surface pl-6 font-serif italic text-content-text-neutral-2',
  lead: 'font-serif text-base font-normal leading-6 text-content-text-neutral-2',
  large: 'font-serif text-base font-semibold text-content-text-neutral-base',
  small:
    'font-serif text-xs font-semibold leading-none text-content-text-neutral-base',
  muted: 'font-serif text-xs font-normal text-content-text-neutral-3'
};
// endregion typographyTheme.ts

export const theme: ReablocksTheme = {
  components: {
    avatar: avatarTheme,
    avatarGroup: avatarGroupTheme,
    arrow: arrowTheme,
    badge: badgeTheme,
    button: buttonTheme,
    contextMenu: contextMenuTheme,
    dateFormat: dateFormatTheme,
    collapse: collapseTheme,
    ellipsis: ellipsisTheme,
    calendarRange: calendarRangeTheme,
    calendar: calendarTheme,
    card: cardTheme,
    dateInput: dateInputTheme,
    divider: dividerTheme,
    dialog: dialogTheme,
    input: inputTheme,
    list: listTheme,
    menu: menuTheme,
    navigation: navigationTheme,
    commandPalette: commandPaletteTheme,
    sort: sortTheme,
    kbd: kbdTheme,
    tooltip: tooltipTheme,
    pager: pagerTheme,
    dotsLoader: dotsLoaderTheme,
    checkbox: checkboxTheme,
    drawer: drawerTheme,
    toggle: toggleTheme,
    chip: chipTheme,
    tabs: tabsTheme,
    radio: radioTheme,
    select: selectTheme,
    skeleton: skeletonTheme,
    backdrop: backdropTheme,
    textarea: textareaTheme,
    notification: notificationTheme,
    range: rangeTheme,
    redact: redactTheme,
    tree: treeTheme,
    popover: popoverTheme,
    jsonTree: jsonTreeTheme,
    breadcrumbs: breadcrumbsTheme,
    stepper: stepperTheme,
    callout: calloutTheme,
    field: fieldTheme,
    typography: typographyTheme
  }
};
