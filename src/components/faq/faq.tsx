"use client";

import { memo } from "react";

import Accordion from "@/components/accordion/accordion";
import Heading from "@/components/heading/heading";
import IFaqProps from "@/components/faq/interfaces/IFaqProps";

import styles from "@/components/faq/faq.styles";

const Faq = memo((props: IFaqProps) =>
    <div className={styles.faqWrapper}>
        <Heading {...props.heading} />
        <Accordion accordions={props.faqQuestions.question} />
    </div>
);

export default Faq;