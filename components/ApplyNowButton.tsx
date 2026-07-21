'use client';


interface props {
    bg:string
    bgDot:string
    title:string
    onclick?: ()=> void
}


export default function ApplyNowButton({
    bg = 'bg-neutral-950',
    bgDot = 'bg-white',
    title = 'Apply Now',
    onclick
}:props) {
    return (
        <button onClick={onclick} className={`cursor-pointer group relative inline-flex h-12 items-center overflow-hidden rounded-full ${bg} pl-6 pr-3 transition-colors duration-300 ease-out`}>
            {/* Expanding white dot -> becomes the new background */}
            <span
                className={`${bg}     absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full   transition-transform duration-300 ease-out   group-hover:z-10  `}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
            <span
                className={`${bgDot}  group-hover:block   absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full   transition-transform duration-300 ease-out group-hover:scale-[27]`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            />

            {/* Sliding text: two identical labels, one above the other */}
            <span className="relative z-10 h-5 overflow-hidden">
                <span className="flex flex-col transition-transform duration-200 ease-out group-hover:-translate-y-5">
                    <span className="block h-5 text-sm font-medium leading-5 text-white">
                        {title}
                    </span>
                    <span className="block h-5 text-sm font-medium leading-5 text-neutral-900">
                        {title}
                    </span>
                </span>
            </span>

            {/* Spacer to reserve dot's footprint in layout */}
            <span className="relative z-10 h-6 w-6 shrink-0" />
        </button>
    );
}