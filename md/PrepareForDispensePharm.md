← Go back to 
[Inventories Module Documentation](/Inventories)


# PrepareForDispensePharm.aspx

## Overview

**File**: `\Inventories\Process\PrepareForDispensePharm.aspx`
**Purpose**: Pharmacy dispensing preparation system for medication dispensing workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacy administrators, dispensing personnel, medical staff

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Patient Selection (Required for Dispensing)**
- **Patient Dropdown**: Must select valid patient for dispensing
- **Error Prevention**: System validates patient is selected before loading orders
- **Data Source**: Patient_information table with patient information
- **Default Behavior**: User must select patient manually
- **Error Message**: Validation prevents order loading without patient selection
- **Validation**: Only active patients with paid sponsors are available

#### 2. **Store Selection (Required for Dispensing)**
- **Store Dropdown**: Must select valid store for dispensing
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only active stores with pharmacy dispense indicator are available

#### 3. **Item Selection (Required for Dispensing)**
- **Item Dropdown**: Must select valid item for dispensing
- **Error Prevention**: System validates item is selected before loading batch information
- **Data Source**: Inventories_Stock table with item information
- **Default Behavior**: User must select item manually
- **Error Message**: Validation prevents batch loading without item selection
- **Validation**: Only items with available quantity are available

#### 4. **Batch Selection (Required for Dispensing)**
- **Batch Dropdown**: Must select valid batch for dispensing
- **Error Prevention**: System validates batch is selected before dispensing
- **Data Source**: Inventories_Stock table with batch information
- **Default Behavior**: User must select batch manually
- **Error Message**: Validation prevents dispensing without batch selection
- **Validation**: Only batches with available quantity are available

#### 5. **Quantity Input (Required for Dispensing)**
- **Quantity Field**: Must enter valid quantity for dispensing
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents dispensing with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 6. **Barcode Count Input (Required for Label Printing)**
- **Barcode Count Field**: Must enter valid barcode count for label printing
- **Error Prevention**: System validates barcode count is between 1 and 2
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter barcode count manually
- **Error Message**: Validation prevents printing with invalid barcode count
- **Validation**: Barcode count must be between 1 and 2

### Common Error Scenarios and Prevention

#### **Patient Selection Errors**
- **Error**: No patient selected
- **Prevention**: Always select patient before loading orders
- **Error**: Patient has no active account
- **Prevention**: Verify patient has active account before selection

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: Store has no pharmacy dispense indicator
- **Prevention**: Verify store has pharmacy dispense capability

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before loading batch information
- **Error**: Item has no available quantity
- **Prevention**: Verify item has available quantity before selection

#### **Batch Selection Errors**
- **Error**: No batch selected
- **Prevention**: Always select batch before dispensing
- **Error**: Batch has no available quantity
- **Prevention**: Verify batch has available quantity before selection

#### **Quantity Errors**
- **Error**: No quantity entered
- **Prevention**: Always enter quantity before dispensing
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts

#### **Dispensing Management Errors**
- **Error**: Dispensing fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have dispensing permissions** via employee group assignments
3. **Patients must be configured** in the system
4. **Stores must be configured** with pharmacy dispense indicator
5. **Items must be available** for dispensing
6. **Orders must be pending** for dispensing

#### **Required System State**
- User authentication must be active
- Dispensing permissions must be configured
- Patient data must be current
- Store data must be current with pharmacy dispense capability
- Item data must be available
- Order data must be pending

### Success Criteria

#### **For Patient Selection**
- ✅ Patient dropdown populated with active patients only
- ✅ Patient validation ensures proper order loading
- ✅ Patient selection enables order filtering

#### **For Store Selection**
- ✅ Store dropdown populated with active stores with pharmacy dispense indicator
- ✅ Store validation ensures proper item loading
- ✅ Store selection enables item filtering

#### **For Item Selection**
- ✅ Item dropdown populated with items having available quantity
- ✅ Item validation ensures proper batch loading
- ✅ Item selection enables batch filtering

#### **For Batch Selection**
- ✅ Batch dropdown populated with batches having available quantity
- ✅ Batch validation ensures proper dispensing
- ✅ Batch selection enables quantity entry

#### **For Quantity Input**
- ✅ Quantity field accepts valid numeric input
- ✅ Quantity validation ensures proper dispensing
- ✅ Quantity values are positive and within limits

#### **For Dispensing Management**
- ✅ Dispensing creates proper dispensing records
- ✅ Item delete removes items from temporary grid
- ✅ Dispensing workflow works with proper validation
- ✅ Dispensing completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for pharmacy dispensing preparation

### Department and Employee Selection Section

```html
<!-- Department and Employee Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="النوع" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" Enabled="false" ID="type">
                        <Items>
                            <dx:BootstrapListEditItem Text="Normal" Value="1" Selected="true"></dx:BootstrapListEditItem>
                            <dx:BootstrapListEditItem Text="Extra Dose" Value="2"></dx:BootstrapListEditItem>
                        </Items>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex; justify-content:space-between">
                        <dx:BootstrapDateEdit runat="server" ID="from" AutoPostBack="false" Caption="من" Width="45%"></dx:BootstrapDateEdit>
                        <dx:BootstrapDateEdit runat="server" ID="to" AutoPostBack="false" Caption="إلى" Width="45%"></dx:BootstrapDateEdit>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="true" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name" OnSelectedIndexChanged="Patient_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" ID="typeHeader" DataSourceID="typeHeaderDS" AutoPostBack="true" TextField="arabic_name" ValueField="code" OnSelectedIndexChanged="typeHeader_SelectedIndexChanged"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn2" Width="100%" Text="بحث" OnClick="search_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="DoseID" DataSourceID="RequstItemsDS" OnSelectionChanged="RequesrItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="false" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="DoseID" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Order No"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Execution Date" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Item Code"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="code" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Item Name"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Route"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dose"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dose Unit"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="frequency"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Duration No"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Duration Unit" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Administration Instructions"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="IV_Header_Code_FK" Caption="IV Header" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Protocol_Header_Code_FK" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Protocol Type"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Order Type"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Current Total Doses"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <ClientSideEvents SelectionChanged="OnSelectionChanged" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Selection and Batch Section

```html
<!-- Item Selection and Batch -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption="الاسم التجارى" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_no" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="inv_no_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                            <dx:BootstrapListBoxField FieldName="Expiration_date" />
                            <dx:BootstrapListBoxField FieldName="remain" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <div style="border: 1px solid #d7d7d7">
                            <dx:BootstrapButton runat="server" Width="100%" ID="batch_no" Visible="false" OnClick="batch_no_Click">
                                <CssClasses Icon="simple-icon-plus" />
                                <SettingsBootstrap RenderOption="Link" />
                            </dx:BootstrapButton>
                        </div>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="40%" ID="batch"></dx:BootstrapTextBox>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="Date"></dx:BootstrapTextBox>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه المتاحه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="batchId" Enabled="false" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسموح" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="delivery_amount"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Quentity" Enabled="true" Width="100%" OnTextChanged="Quentity_TextChanged" AutoPostBack="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الحاله" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" ID="status" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="عدد الباكود" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Enabled="true" ID="count_label" Number="1" MinValue="1" MaxValue="2" Width="100%"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption=":" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-content: center; justify-content: center;">
                        <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn1" Text="اضافة" OnClick="add_Click">
                            <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                            <CssClasses Icon="simple-icon-plus" />
                            <SettingsBootstrap RenderOption="Secondary" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Dispensing Grid Section

```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="checkGridViewTempDS" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowDeleteButton="true" Width="30px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="store" Caption="كودالمخزن"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="storename" Caption="اسم المخزن"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="patch" Caption="الدفعه"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Quntitiy" Caption="الكميه المصروفه"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="item" Caption="كود الصنف"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="status" Caption="الحاله"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ActiveCode" Caption="كود المادة" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Category" Caption="النوع" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Frequency" Caption="التكرار" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Duration_no" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Duration_unit" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Administration_Instructions" Caption="التعليمات" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Dose_After" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="IvCode" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="IVName" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ProtocolID" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PharmDose_FK" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Count_Lable" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="dose_unit" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Dose" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" Visible="true"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="FK_order_no" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ProtocolType" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                    <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                </dx:BootstrapGridView>
            </dx:ContentControl>
        </ContentCollection>
    </dx:BootstrapLayoutItem>
</Items>
</dx:BootstrapLayoutGroup>
```

### Save Button Section

```html
<!-- Save Button -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btn_approve" runat="server" AutoPostBack="true" EnableCallbackMode="false" Text="حفظ" Width="100%" OnClick="btn_approve_Click">
                <CssClasses Icon="simple-icon-Cursor" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Batch Selection Popup Section

```html
<!-- Batch Selection Popup -->
<dx:BootstrapPopupControl ID="batchPoP" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="الدفعه" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="400px" Height="400px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server">
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapGridView runat="server" ID="batchGridView" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="Expiration_date" Styles-Cell-HorizontalAlign="Center" DataSourceID="batchGridViewDS" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="batchGridView_SelectionChanged">
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                                    <Columns>
                                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="Expiration_date" Caption="تاريخ انتهاء الصلاحيه"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="remain" Caption="الكميه"></dx:BootstrapGridViewDataColumn>
                                    </Columns>
                                    <Settings VerticalScrollableHeight="350" />
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                                </dx:BootstrapGridView>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

### Print Popup Section

```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print_pop" runat="server" CloseAction="CloseButton" style="top:0 !important;" ClientInstanceName="popupMessage" CloseAnimationType="Auto" PopupElementCssSelector="#default-popup-control-5" CloseOnEscape="True" HeaderText="print" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="1200px">
    <ContentCollection>
        <dx:ContentControl>
            <rsweb:ReportViewer ID="ReportViewer1" KeepSessionAlive="true" runat="server" Height="800px" Width="100%" Visible="true">
            </rsweb:ReportViewer>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@file` - Patient file ID for filtering orders

**Store Parameters**:
- `@STORE` - Store ID for filtering items

**Item Parameters**:
- `@code` - Item code for filtering batch information
- `@effective` - Effective item code for filtering

**Date Parameters**:
- `@from` - Start date for filtering orders
- `@to` - End date for filtering orders

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Patient Selection**: Loads orders based on selected patient
3. **Store Selection**: Loads items based on selected store
4. **Item Selection**: Loads batch information based on selected item
5. **Batch Selection**: Loads available quantity for selected batch
6. **Quantity Entry**: Validates quantity for dispensing
7. **Item Addition**: Adds item to temporary dispensing grid
8. **Dispensing Save**: Saves complete dispensing records
9. **Label Printing**: Prints labels for dispensed items

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads patient information
3. Loads store information
4. Sets default dispensing state

### Patient_SelectedIndexChanged Method

```csharp
protected void Patient_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads orders based on selected patient

**Process**:
1. Validates patient selection
2. Sets parameters for order data source
3. Binds order grid
4. Updates patient information display

### typeHeader_SelectedIndexChanged Method

```csharp
protected void typeHeader_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for item data source
3. Binds item dropdown
4. Updates store information display

### inv_no_SelectedIndexChanged Method

```csharp
protected void inv_no_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information based on selected item

**Process**:
1. Validates item selection
2. Sets parameters for batch data source
3. Binds batch dropdown
4. Updates item information display

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary dispensing grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates batch is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary dispensing grid
7. Clears form fields for next addition

### btn_approve_Click Method

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete dispensing records

**Process**:
1. Validates at least one item is added
2. Generates new dispensing document number
3. Inserts dispensing header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### batchGridView_SelectionChanged Method

```csharp
protected void batchGridView_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Selects batch from popup

**Process**:
1. Validates batch selection
2. Sets batch information
3. Closes popup
4. Updates batch information display

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active, Store_type, pharm_dispense_indicator
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores with pharm_dispense_indicator = 1

#### **Patient_information**
- **Purpose**: Patient master data
- **Key Fields**: FileId, Patient_Name, Sponsor_FK
- **Usage**: Provides patient list for filtering
- **Filtering**: Only active patients with paid sponsors

#### **Inventories_Stock**
- **Purpose**: Stock records with batch information
- **Key Fields**: ID, Itemcode, storeid, Expiration_date, Quantity_Exchange, Amount_Done_Exchange, MoveType
- **Usage**: Tracks batch information for dispensing
- **Filtering**: Only items with available quantity

#### **Inventories_General_Dispense_Prepare_Temp**
- **Purpose**: Temporary dispensing records before save
- **Key Fields**: ID, store, item, patch, Quntitiy, status, emp, fileID, date, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Expiration_date, FK_order_no, ProtocolType
- **Usage**: Tracks dispensing items before save

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing dispensing data

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, arabic_name, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @ResponsableEmp and WS.pharm_dispense_indicator = 1
```

**Filtering Logic**: Shows only stores with active rules and pharmacy dispense indicator
**Permission Logic**: Only stores with pharmacy dispense capability are available
**Validation**: Ensures store has pharmacy dispense capability

#### **Patient Filtering**
```sql
select distinct Patient_information.FileId, Patient_information.Patient_Name from Patient_information 
inner join sponsors s on s.code= Patient_information.Sponsor_FK and s.Paid_Sponsor_Ind=1
```

**Filtering Logic**: Shows only patients with paid sponsors
**Permission Logic**: Only patients with paid sponsors are available
**Validation**: Ensures patient has active account

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to patient, store, and item dropdowns

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("جارى التحميل...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Checkbox Selection Function

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Checkbox Logic**: Ensures only one checkbox is selected at a time
**User Experience**: Provides single selection behavior for grid
**Usage**: Applied to grid checkboxes for single selection

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Popup Handling Function

```javascript
var keyValue;
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Popup Logic**: Handles popup display and callback
**User Experience**: Provides detailed information display
**Usage**: Applied to grid for detailed information display

### Back Button Prevention Function

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Back Button Logic**: Prevents browser back button usage
**User Experience**: Ensures proper workflow navigation
**Usage**: Applied to page for workflow security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Department and Employee Selection Section**
```html
<!-- Department and Employee Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="النوع" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **3. Item Selection and Batch Section**
```html
<!-- Item Selection and Batch -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption="الاسم التجارى" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكميه المتاحه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="المسموح" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الكميه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الحاله" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="عدد الباكود" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption=":" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Temporary Dispensing Grid Section**
```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

#### **5. Save Button Section**
```html
<!-- Save Button -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
```

#### **6. Batch Selection Popup Section**
```html
<!-- Batch Selection Popup -->
<dx:BootstrapPopupControl ID="batchPoP" runat="server">
```

#### **7. Print Popup Section**
```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print_pop" runat="server">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Department Data Source
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID,Dep_Name FROM DefinitionDep";

// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Emp_Code not in ('0','00')";

// Patient Data Source
SqlDataSource PatientDS = new SqlDataSource();
PatientDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
PatientDS.SelectCommand = "select distinct Patient_information.FileId,Patient_information.Patient_Name from Patient_information inner join sponsors s on s.code= Patient_information.Sponsor_FK and s.Paid_Sponsor_Ind=1";

// Store Data Source
SqlDataSource typeHeaderDS = new SqlDataSource();
typeHeaderDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
typeHeaderDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code,arabic_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @ResponsableEmp and WS.pharm_dispense_indicator = 1";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "[pharm_StoreBalanceWithBatchNo_Prepare]";

// Request Items Data Source
SqlDataSource RequstItemsDS = new SqlDataSource();
RequstItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequstItemsDS.SelectCommand = "if @extra = '1' begin select OrdersOrderID as [Order No], format(Order_Pharmacy_Doses.Execution_Date,'yyyy-MM-dd HH:mm') as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Order_Pharmacy_Doses.Dispence_Done=0 and EXTRA_doses is null and Orders.Account in (Select VisitAccount.AccountNo from VisitAccount where FileId=@file and VisitAccount.Active_Close='A') order by Execution_Date,code,Order_No,OrderEntery.IV_Header_Code_FK end else begin select Orders.OrderID as [Order No], format(Order_Pharmacy_Doses.Execution_Date,'yyyy-MM-dd HH:mm') as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Order_Pharmacy_Doses.Dispence_Done=0 and EXTRA_doses is not null and Orders.Account in (Select VisitAccount.AccountNo from VisitAccount where FileId=@file and VisitAccount.Active_Close='A') order by Execution_Date,code,Order_No,OrderEntery.IV_Header_Code_FK end";

// Temporary Dispensing Data Source
SqlDataSource checkGridViewTempDS = new SqlDataSource();
checkGridViewTempDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewTempDS.SelectCommand = "SELECT Inventories_General_Dispense_Prepare_Temp.ID, store, patch, Quntitiy, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', 'Waiting' as status, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Inventories_General_Dispense_Prepare_Temp.Expiration_date, FK_order_no, ProtocolType FROM Inventories_General_Dispense_Prepare_Temp inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_Prepare_Temp.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store where emp =@emp and fileID = @file_id";
checkGridViewTempDS.DeleteCommand = "DELETE FROM Inventories_General_Dispense_Prepare_Temp where ID=@ID";

// Batch Data Source
SqlDataSource batchGridViewDS = new SqlDataSource();
batchGridViewDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
batchGridViewDS.SelectCommand = "select Expiration_date,(SUM(Quantity_Exchange - Amount_Done_Exchange) ) remain from Inventories_Stock where Itemcode=@code and storeid=@store and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) and Expiration_date not in (select Expiration_date FROM Inventories_General_Dispense_Prepare_Temp where emp=@emp and item=@code and Quntitiy = (select (SUM(Quantity_Exchange) - SUM(Amount_Done_Exchange) ) from Inventories_Stock where Inventories_Stock.Expiration_date = Inventories_General_Dispense_Prepare_Temp.Expiration_date and Itemcode= @code and storeid=@store ) and date=@date) group by Expiration_date having (SUM(Quantity_Exchange - Amount_Done_Exchange) ) > 0 order by Expiration_date";
```

## Business Logic and Validation

### Patient Selection Validation

```csharp
protected void Patient_SelectedIndexChanged(object sender, EventArgs e)
{
    if (Patient.Value == "" || Patient.Value == null)
    {
        // Clear order grid
        RequesrItems.DataSource = null;
        RequesrItems.DataBind();
        return;
    }
    // ... additional validation
}
```

**Patient Logic**: Validates patient selection before loading orders
**Error Prevention**: Prevents order loading without patient selection

### Store Selection Validation

```csharp
protected void typeHeader_SelectedIndexChanged(object sender, EventArgs e)
{
    if (typeHeader.Value == "" || typeHeader.Value == null)
    {
        // Clear item dropdown
        inv_no.DataSource = null;
        inv_no.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading items
**Error Prevention**: Prevents item loading without store selection

### Item Selection Validation

```csharp
protected void inv_no_SelectedIndexChanged(object sender, EventArgs e)
{
    if (inv_no.Value == "" || inv_no.Value == null)
    {
        // Clear batch information
        batch.Text = "";
        Date.Text = "";
        batchId.Text = "";
        delivery_amount.Text = "";
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading batch information
**Error Prevention**: Prevents batch loading without item selection

### Quantity Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (Convert.ToDecimal(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Error Prevention**: Prevents adding with invalid quantity

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Patient Selection Validation**: Must select patient before loading orders
- **Store Selection Validation**: Must select store before loading items
- **Item Selection Validation**: Must select item before loading batch information
- **Batch Selection Validation**: Must select batch before dispensing
- **Quantity Validation**: Must enter quantity before dispensing
- **Barcode Count Validation**: Must enter barcode count before printing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Patient Validation**: Ensures patient has active account
- **Store Validation**: Ensures store has pharmacy dispense capability
- **Item Validation**: Ensures item has available quantity
- **Batch Validation**: Ensures batch has available quantity
- **Quantity Validation**: Ensures quantity is positive and within limits
- **Barcode Count Validation**: Ensures barcode count is between 1 and 2

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Dispensing Access**: Ensures user can access and modify dispensing records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Dispensing Save Success**: "تم حفظ الصرف" (Dispensing saved successfully)
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Pharmacy Dispensing Management System**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Inventories_wharehouse_store` - Store master data
  - `Patient_information` - Patient master data
  - `Inventories_Stock` - Stock records with batch information
  - `Inventories_General_Dispense_Prepare_Temp` - Temporary dispensing records
  - `Inventories_Item_Settings` - Item master data
- **Integration Details**:
  - Patient selection controls order filtering
  - Store selection controls item filtering
  - Item selection controls batch filtering
  - Dispensing tracked with complete information
- **Data Flow**:
  - Patients filtered for user access
  - Stores filtered by user permissions
  - Items filtered by store
  - Batches filtered by item
  - Dispensing tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all dispensing operations
  - Store access controlled by user permissions

### Data Exchange

#### **Patient and Order Information**
- **Database Tables**:
  - `Patient_information` - Patient master data
  - `OrderEntery` - Order entry records
  - `Order_Pharmacy_Doses` - Order pharmacy doses
- **Real-time Data**:
  - Patient information for filtering
  - Order information for dispensing
  - Dose information and quantities
- **Data Relationships**:
  - Patients linked to orders via FileId
  - Orders linked to doses via Order_Entry_FK
  - Dispensing tracked by user

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with batch information
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_General_Dispense_Prepare_Temp` - Temporary dispensing records
- **Real-time Data**:
  - Item details and descriptions
  - Batch information and quantities
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to batches via Itemcode
  - Batches linked to dispensing via Expiration_date
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المريض" Error**
- **Cause**: Patient not selected before loading orders
- **Solution**: Always select patient before loading orders
- **Prevention**: Patient selection is required for all dispensing operations

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all dispensing operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before loading batch information
- **Solution**: Always select item before loading batch information
- **Prevention**: Item selection is required for all dispensing operations

#### **"الرجاء اختيار الدفعة" Error**
- **Cause**: Batch not selected before dispensing
- **Solution**: Always select batch before dispensing
- **Prevention**: Batch selection is required for all dispensing operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered before dispensing
- **Solution**: Always enter quantity before dispensing
- **Prevention**: Quantity entry is required for all dispensing operations

#### **No Orders Found**
- **Cause**: Patient has no orders pending dispensing
- **Solution**: Verify patient has orders pending dispensing
- **Prevention**: Ensure patients have orders pending dispensing

#### **Dispensing Save Failed Error**
- **Cause**: Dispensing cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

#### **Item Delete Failed Error**
- **Cause**: Item cannot be deleted
- **Solution**: Verify item is selected from temporary grid
- **Prevention**: Ensure proper selection before deletion

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Dispensing Access**: Access to dispensing operations
- **Store Access**: Access to stores with pharmacy dispense capability

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Dispensing Workflow**: Understanding of dispensing process
- **Patient Management**: Knowledge of patient selection and filtering
- **Store Management**: Knowledge of store selection and filtering
- **Dispensing Management**: Familiarity with dispensing save and delete operations

## Usage Examples

### Basic Dispensing Workflow

1. **Page Load**: Verify page loads with default data
2. **Patient Selection**: Select patient for dispensing
3. **Store Selection**: Select store for dispensing
4. **Order Review**: Review orders in request items grid
5. **Order Selection**: Select specific orders for dispensing
6. **Item Selection**: Select item for dispensing
7. **Batch Selection**: Select batch for dispensing
8. **Quantity Entry**: Enter quantity for dispensing
9. **Item Addition**: Add item to temporary dispensing grid
10. **Repeat Items**: Add additional dispensing items as needed
11. **Dispensing Save**: Save complete dispensing records

### Dispensing Management Workflow

1. **Patient Selection**: Select patient for dispensing management
2. **Store Selection**: Select store for dispensing
3. **Order Review**: Review orders in request items grid
4. **Order Selection**: Select specific orders for dispensing
5. **Item Selection**: Select item for dispensing
6. **Batch Selection**: Select batch for dispensing
- **Quantity Entry**: Enter quantity for dispensing
- **Item Addition**: Add item to temporary dispensing grid
- **Item Review**: Review items in temporary dispensing grid
- **Item Delete**: Remove items from temporary dispensing grid
- **Dispensing Completion**: Save dispensing with all validated items

### Multi-Item Dispensing Management

1. **Patient Selection**: Select patient for dispensing
2. **Store Selection**: Select store for dispensing
3. **Multiple Order Selection**: Select multiple orders for dispensing
4. **Multiple Item Selection**: Select multiple items for dispensing
5. **Batch Selection**: Select batch for each item
6. **Quantity Entry**: Enter quantity for each item
7. **Item Addition**: Add all items to temporary dispensing grid
8. **Dispensing Save**: Save complete dispensing with all items
9. **Label Printing**: Print labels for dispensed items