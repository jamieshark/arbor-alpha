import React = require('external/react');

interface ArborColorPageProps extends React.Props<ArborColorPage> {
}

export class ArborColorPage extends React.Component<ArborColorPageProps, any> {
    public render () {
        return (
            <div className='grid__section'>

                <div className='grid__container '>
                    <div className='grid__item '>
                        <h1 className='type--title-1'>Color</h1>
                        <p className='type--copy-standard'>
                            Swatches purposely have a limited default pallete. This is inteded to
                            allow us to stay on brand, but also to be more deliberate with our use
                            color. For example, we have three "Gray" colors, each with their own
                            purpose and intent, as implied by their names.
                        </p>
                    </div>
                </div>

                <hr className='divider--section divider' />

                <div className='grid__container demo__element'>
                    <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                        <div className='demo__color demo__color__label'>
                            <p className='type--copy-small'>Dropbox Blue</p>
                        </div>
                    </div>
                    <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                        <div className='demo__color demo__color--blue'>
                            #007EE5
                        </div>
                    </div>
                    <div className='grid__item grid__item--medium--1-2  grid__item--medium--order-3'>
                        <div className='demo__color demo__color--short demo__color--blue-80'>80%</div>
                        <div className='demo__color demo__color--short demo__color--blue-60'>60%</div>
                        <div className='demo__color demo__color--short demo__color--blue-30'>30%</div>
                        <div className='demo__color demo__color--short demo__color--blue-15'>15%</div>
                        <div className='demo__color demo__color--short demo__color--blue-10'>10%</div>
                    </div>
                </div>

                <hr className='divider--section divider' />

                <div className='grid__container demo__element'>
                    <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                        <div className='demo__color demo__color__label'>
                            <p className='type--copy-small'>Dropbox Gray</p>
                        </div>
                    </div>
                    <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                        <div className='demo__color demo__color--gray'>
                            #7B8994
                        </div>
                    </div>
                    <div className='grid__item grid__item--medium--1-2  grid__item--medium--order-3'>
                            <div className='demo__color demo__color--short demo__color--gray-60'>60%</div>
                            <div className='demo__color demo__color--short demo__color--gray-30'>30%</div>
                            <div className='demo__color demo__color--short demo__color--gray-15'>15%</div>
                    </div>
                </div>

                <hr className='divider--section divider' />

                <div className='grid__container demo__element'>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                            <div className='demo__color demo__color__label'>
                                <p className='type--copy-small'>White</p>
                            </div>
                        </div>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                            <div className='demo__color demo__color--white'>#FFFFFF</div>
                        </div>
                    </div>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                            <div className='demo__color demo__color__label'>
                                <p className='type--copy-small'>Background Gray</p>
                            </div>
                        </div>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                            <div className='demo__color demo__color--bg-gray'>#F8FAFB</div>
                        </div>
                    </div>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                            <div className='demo__color demo__color__label'>
                                <p className='type--copy-small'>Text Grey</p>
                            </div>
                        </div>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                            <div className='demo__color demo__color--text-gray'>#3D464D</div>
                        </div>
                    </div>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                            <div className='demo__color demo__color__label'>
                                <p className='type--copy-small'>Text Green</p>
                            </div>
                        </div>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                            <div className='demo__color demo__color--text-green'>#26AC5D</div>
                        </div>
                    </div>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-2'>
                            <div className='demo__color demo__color__label'>
                                <p className='type--copy-small'>Text Red</p>
                            </div>
                        </div>
                        <div className='grid__item grid__item--medium--1-2 grid__item--medium--order-1'>
                            <div className='demo__color demo__color--text-red'>#DD3B38</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
