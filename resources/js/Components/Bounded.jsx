import clsx from 'clsx';

export function Bounded({
    as: Comp = 'section', // Permet de choisir quel type de balise utiliser
    id,  // SPasser un id dynamique
    className,
    children,  // Les enfants qui seront passés au composant
    ...restProps
}) {
    return (
        <Comp
            id={id}  // L'attribut ID est appliqué ici
            className={clsx(
                '~py-10/16 px-6 [.header+&]:pt-44 [.header+&]:md:pt-32',
                className,
            )}
            {...restProps}
        >
            <div className="mx-auto w-full max-w-6xl">{children}</div>
        </Comp>
    );
}
