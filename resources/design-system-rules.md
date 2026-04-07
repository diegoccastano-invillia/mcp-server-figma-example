# Design System Rules

## Tokens
- **Cores**: usar variáveis CSS (`--color-primary`, `--color-secondary`, etc.)
- **Tipografia**: respeitar font-family, font-weight e line-height definidos no Figma
- **Espaçamento**: usar escala de 4px (`space-1 = 4px`, `space-2 = 8px`, ...)

## Componentes
- Sempre gerar componentes React funcionais (`function`, não `class`)
- Usar Tailwind CSS utilities; só criar CSS customizado se não houver utility equivalente
- Nomear componentes com PascalCase idêntico ao nome do Component no Figma

## Responsividade
- Mobile-first: começar com layout mobile, usar `md:` e `lg:` breakpoints
- Frames com Auto Layout → usar `flex` ou `grid`
